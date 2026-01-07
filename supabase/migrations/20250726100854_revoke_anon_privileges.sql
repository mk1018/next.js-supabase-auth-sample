-- anonロールからのAPIリクエストをブロック
CREATE OR REPLACE FUNCTION public.block_api_access()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  IF current_setting('role', true) = 'anon' THEN
    RAISE EXCEPTION 'Anonymous access is not allowed';
  END IF;
END;
$$;

-- 全APIリクエストで実行
ALTER ROLE authenticator SET pgrst.db_pre_request = 'public.block_api_access';
NOTIFY pgrst, 'reload config';

-- =============================================================================
-- 別案: RLSでanonをブロックする場合（テーブルごとに設定が必要）
-- =============================================================================
-- ALTER TABLE テーブル名 ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "deny_anon" ON テーブル名
--   AS RESTRICTIVE
--   FOR ALL
--   TO anon
--   USING (false);
-- =============================================================================

-- =============================================================================
-- 別案: anonの権限をすべて剥奪する場合
-- =============================================================================
-- REVOKE all privileges ON SCHEMA public
-- FROM
--   anon;

-- REVOKE all privileges ON all tables IN SCHEMA public
-- FROM
--   anon;

-- ALTER DEFAULT privileges IN SCHEMA public
-- REVOKE all ON tables
-- FROM
--   anon;

-- ALTER DEFAULT privileges IN SCHEMA public
-- REVOKE all ON functions
-- FROM
--   anon;

-- ALTER DEFAULT privileges IN SCHEMA public
-- REVOKE all ON sequences
-- FROM
--   anon;
