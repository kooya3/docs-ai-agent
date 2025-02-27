import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
            card: "bg-white/10 backdrop-blur-xl border border-white/20",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "border border-white/20 hover:border-purple-500",
            socialButtonsBlockButtonText: "text-white",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-white/5 border-white/10 text-white",
            footerActionLink: "text-purple-400 hover:text-purple-300",
            formFieldInputShowPasswordButton: "text-gray-400",
          },
        }}
      />
    </div>
  )
}

