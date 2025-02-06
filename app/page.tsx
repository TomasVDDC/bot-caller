import PhoneForm from "@/app/components/PhoneForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Voice Agent Caller</h1>
      <PhoneForm />
    </main>
  )
}

