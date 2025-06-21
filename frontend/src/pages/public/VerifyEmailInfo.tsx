import { AppMessage } from '@/shared/components/AppMessage';

export const VerifyEmailInfo = () => {
  return (
    <AppMessage
      title="Verify your email"
      description="Check your email to find your Verification Link and follow further instructions."
      linkLabel="Login"
      linkPath="/login"
    />
  );
};
