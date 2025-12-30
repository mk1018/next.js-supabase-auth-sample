-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add triggers for updated_at
CREATE TRIGGER refresh_updated_at_step1
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION refresh_updated_at_step1();

CREATE TRIGGER refresh_updated_at_step2
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION refresh_updated_at_step2();

CREATE TRIGGER refresh_updated_at_step3
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION refresh_updated_at_step3();

-- Add index on id for faster lookups
CREATE INDEX idx_user_profiles_id ON user_profiles(id);
