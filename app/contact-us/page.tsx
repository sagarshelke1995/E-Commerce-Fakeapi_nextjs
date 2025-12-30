import ContactForm from "./ContactForm"
import { BorderBeam } from "@/components/lightswind/border-beam"
import GridPattern from "@/components/GridPattern"


export default function Page() {
  return (
    <>

               <div className="relative w-full max-w-4xl mx-auto border  bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-800 rounded-lg mt-16">
                            <BorderBeam />
                            <GridPattern
                                title="Get in Touch with MyStore"
                              />
                            </div>

    <div className="relative max-w-6xl mx-auto p-5 overflow-hidden">
    
      <section className="mt-10 px-4 md:px-10">
        <div className="max-w-2xl mx-auto">
          <div className="mt-10 rounded-2xl backdrop-blur-xl shadow-xl p-6 md:p-8 relative">
            <BorderBeam/>
            <ContactForm />
          </div>

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
