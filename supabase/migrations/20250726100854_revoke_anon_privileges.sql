REVOKE all privileges ON all tables IN SCHEMA public
FROM
  anon;

ALTER DEFAULT privileges IN SCHEMA public
REVOKE all ON tables
FROM
  anon;

ALTER DEFAULT privileges IN SCHEMA public
REVOKE all ON functions
FROM
  anon;

ALTER DEFAULT privileges IN SCHEMA public
REVOKE all ON sequences
FROM
  anon;
