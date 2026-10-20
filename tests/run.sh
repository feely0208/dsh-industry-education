#!/bin/bash
# 双向验证：正例必须报，反例必须不报（误报是安全工具的头号杀手）
set -uo pipefail
export PATH="/usr/local/bin:$PATH"
cd "$(dirname "$0")/.."
PASS=0; FAIL=0
ok(){ echo "  ✅ $1"; PASS=$((PASS+1)); }
bad(){ echo "  ❌ $1"; FAIL=$((FAIL+1)); }

echo ""; echo "  $(node -p "require('./package.json').name") · 双向验证"
echo "  ────────────────────────────────────────────────"

# 小工具：从 --json 输出里数某个 ruleId 的命中数
count_rule() { # $1=json  $2=ruleId
  echo "$1" | python3 -c "
import json,sys
try:
    d=json.load(sys.stdin)
    print(len([f for f in d.get('findings',[]) if f.get('ruleId')=='$2']))
except Exception: print(0)" 2>/dev/null
}
count_all() { # $1=json
  echo "$1" | python3 -c "
import json,sys
try: print(len(json.load(sys.stdin).get('findings',[])))
except Exception: print(-1)" 2>/dev/null
}
has_na() { # $1=json  $2=ruleId
  echo "$1" | python3 -c "
import json,sys
try:
    d=json.load(sys.stdin)
    print(1 if '$2' in (d.get('stats',{}).get('notApplicable') or []) else 0)
except Exception: print(0)" 2>/dev/null
}

RULES="EDU-APP-FILING-PUBLIC EDU-APP-FILING-RECORD EDU-SCORE-RANK-PUBLIC EDU-AD-GAME-SDK EDU-AGE-RANGE-NOTICE EDU-STUDENT-ID-EXPOSURE EDU-CHILD-PI-OFFICER"

echo ""; echo "  【正例】tests/fixtures/fail/demo-project（7 条判据逐条必须报出）"
J=$(node bin/cli.mjs --root tests/fixtures/fail/demo-project --json 2>&1)
for rid in $RULES; do
  c=$(count_rule "$J" "$rid")
  [ "${c:-0}" -gt 0 ] && ok "$rid 报出（$c 处）" || bad "$rid 未报出"
done

echo ""; echo "  【正例·when】demo 是移动端教育 App，行业规则必须全部实际运行（不能靠不适用假绿）"
NA_DEMO=$(echo "$J" | python3 -c "
import json,sys
try: print(','.join(json.load(sys.stdin).get('stats',{}).get('notApplicable') or []) or 'none')
except Exception: print('parse-error')" 2>/dev/null)
[ "${NA_DEMO:-x}" = "none" ] && ok "demo 上 7 条规则全部运行（notApplicable = none）" || bad "demo 上有规则被跳过：${NA_DEMO}"

echo ""; echo "  【正例·absence】absence 类规则只报一次，不按文件重复刷屏"
for rid in EDU-APP-FILING-PUBLIC EDU-AGE-RANGE-NOTICE EDU-CHILD-PI-OFFICER; do
  c=$(count_rule "$J" "$rid")
  [ "${c:-0}" = "1" ] && ok "$rid 只报 1 次（absence 语义正确）" || bad "$rid 报了 ${c} 次（absence 应整组只报一次）"
done

echo ""; echo "  【反例】tests/fixtures/pass/clean-project（必须 0 命中）"
M=$(node bin/cli.mjs --root tests/fixtures/pass/clean-project --quiet 2>&1 | grep -oE '^[0-9]+' | head -1)
[ "${M:-1}" = "0" ] && ok "干净样本 0 命中（有备案号 / 备案表 / 适龄 / 负责人 / 学籍占位号）" || bad "干净样本误报 ${M} 条"

echo ""; echo "  【反例·纯后端】tests/fixtures/pass/backend-only（无移动端入口的成人培训后端，必须 0 命中）"
B=$(node bin/cli.mjs --root tests/fixtures/pass/backend-only --json 2>&1)
NB=$(count_all "$B")
[ "${NB:-1}" = "0" ] && ok "纯后端样本 0 命中（行业规则没有误伤）" || bad "纯后端样本误报 ${NB} 条"
for rid in EDU-APP-FILING-PUBLIC EDU-APP-FILING-RECORD EDU-AGE-RANGE-NOTICE EDU-CHILD-PI-OFFICER; do
  n=$(has_na "$B" "$rid")
  [ "${n:-0}" = "1" ] && ok "$rid 在纯后端项目上按设计不适用（when 生效）" || bad "$rid 未进入 notApplicable —— when 可能失效，纯后端会被误报"
done

echo ""; echo "  【边界】反例里「看起来像违规、其实合规」的写法必须放行"
grep -q 'G000000000000000000' tests/fixtures/pass/clean-project/test/fixtures/student.json \
  && ok "学籍号全 0 占位不报（排除逻辑生效）" || bad "反例缺少全 0 占位学籍号样本"
grep -q '"ageRating"' tests/fixtures/pass/clean-project/app.json \
  && ok "app.json 有 ageRating 时不报适龄缺失" || bad "反例缺少 ageRating 样本"
grep -q 'play-services-base' tests/fixtures/pass/clean-project/android/app/build.gradle \
  && ok "play-services-base（非广告包）不误判成 play-services-ads" || bad "反例缺少 play-services-base 边界样本"
grep -q '/api/score/mine' tests/fixtures/pass/clean-project/src/api/score.ts \
  && ok "只有 /api/score/mine（无榜单路由）时不报成绩排名" || bad "反例缺少 /api/score/mine 样本"

echo ""; echo "  【溯源】每条规则必须带 source（法条可查证）与 advice（≥40 字）"
python3 - <<'PY' && ok "全部规则均有 source 与 advice" || bad "有规则缺 source / advice 过短"
import json,glob,sys
bad=0
for f in sorted(glob.glob('rules/*.json')):
    r=json.load(open(f,encoding='utf-8'))
    if not r.get('source'): print('缺 source:',r.get('id'),file=sys.stderr); bad+=1
    if len(r.get('advice') or '')<40: print('advice 过短:',r.get('id'),file=sys.stderr); bad+=1
    chk=r.get('check') or {}
    if chk.get('type') in ('files-lack','file-lacks') and not chk.get('when'):
        print('absence 规则缺 when:',r.get('id'),file=sys.stderr); bad+=1
sys.exit(1 if bad else 0)
PY

echo ""; echo "  【加载一致性】rules/ 里的文件数与 --list-rules 的条数必须一致"
RF=$(ls rules/*.json | wc -l | tr -d ' ')
LR=$(node bin/cli.mjs --list-rules 2>&1 | grep -cE '^\s+\[(high|medium|low)\]')
[ "$RF" = "$LR" ] && ok "规则文件 ${RF} 个 = 加载 ${LR} 条" || bad "规则文件 ${RF} 个，但只加载了 ${LR} 条"

echo ""; echo "  ────────────────────────────────────────────────"
echo "  通过 $PASS · 失败 $FAIL"; echo ""
[ "$FAIL" -eq 0 ] || exit 1
