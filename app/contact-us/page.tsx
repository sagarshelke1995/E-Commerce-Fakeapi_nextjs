import ContactForm from "./ContactForm"
import { BorderBeam } from "@/components/lightswind/border-beam"
import GridPattern from "@/components/GridPattern"


export const metadata = {
  title: "Contact Us",
  description:
    "Have questions, feedback, or issues with waifu2x? Contact our team and we’ll get back to you as soon as possible.",
}

export default function Page() {
  return (
    <>

               <div className="relative w-full max-w-4xl mx-auto border  bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-800 rounded-lg mt-16">
                            <BorderBeam />
                            <GridPattern title={{ name: "Get in Touch with MyStore" }} />
                            </div>

    {/* Background Glow */}
    

    <div className="relative max-w-6xl mx-auto p-5 overflow-hidden">
      {/* ---------- HERO ---------- */}
      <section className="text-center py-14 px-4">
        <h1 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-semibold">
          Get in Touch with <span className="text-primary">MyStore</span>
        </h1>

        <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg">
          Have a question, found a bug, or want to share feedback?
          We’re always happy to hear from you. Our team aims to respond
          as quickly as possible.
        </p>
      </section>

      {/* ---------- FORM SECTION ---------- */}
      <section className="mt-10 px-4 md:px-10">
        <div className="max-w-2xl mx-auto">
          
          {/* Title */}
          <h2 className="text-center font-secondary text-3xl sm:text-4xl font-semibold">
            📬 Contact Us
          </h2>
          <p className="text-center text-sm text-foreground/60 mt-2">
            Fill out the form below and we’ll get back to you shortly.
          </p>

          {/* FORM CARD */}
          <div className="mt-10 rounded-2xl backdrop-blur-xl shadow-xl p-6 md:p-8 relative">
            <BorderBeam/>
            <ContactForm />
          </div>

          {/* Privacy Note */}
          <p className="mt-4 text-center text-xs text-gray-500">
            We respect your privacy. Your information will only be used to
            respond to your message.
          </p>
        </div>
      </section>
    </div>
    </>
  )
}
