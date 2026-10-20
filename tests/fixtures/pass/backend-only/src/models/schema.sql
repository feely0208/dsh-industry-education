CREATE TABLE scores (
  id bigserial PRIMARY KEY,
  user_id bigint NOT NULL,
  term_id text NOT NULL,
  total_score numeric(5, 2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, term_id)
);
