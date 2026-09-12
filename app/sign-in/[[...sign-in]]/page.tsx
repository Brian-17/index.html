import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center p-4">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
