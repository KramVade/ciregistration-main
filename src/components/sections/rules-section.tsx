import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Heart, Shirt, Smartphone, Users, Moon, Smile, ShieldAlert, Sparkles, Package } from "lucide-react";

const rules = [
  {
    icon: <MapPin className="h-5 w-5 mr-3 text-primary" />,
    title: '1. "Ask First, Explore Later"',
    content:
      'Gusto mo lumabas ng premises? Magpaalam muna sa worker/officer. Hindi to "escape room," bes — safety first! At syempre, bawal mag-solo. Group tayo lagi.',
  },
  {
    icon: <Heart className="h-5 w-5 mr-3 text-red-500" />,
    title: '2. "Respect is the Best Outfit"',
    content:
      "Lahat dito — workers, officers, campers — trato natin with respect. Walang attitude, walang bullying, walang power tripping. Tayo-tayo rin ang magkakasama 'til the end!",
  },
  {
    icon: <Shirt className="h-5 w-5 mr-3 text-accent" />,
    title: '3. "Dress Modestly, Move Comfortably"',
    content:
      "OOTD? Sige! Pero: Dapat maayos, hindi revealing. Walang offensive na print. Ayos din kung may worship fit, activity fit, at presentation fit. Basta classy, comfy, and Christ-like. ✨",
  },
  {
    icon: <Smartphone className="h-5 w-5 mr-3 text-primary" />,
    title: '4. "Phone Down, Heart Open"',
    content:
      "Yes, may signal. Pero sana hindi ka mawala sa moment. Keep phone on silent. No scrolling during worship, devotions, at sessions. Free time = phone time. The rest = real life time.",
  },
  {
    icon: <Users className="h-5 w-5 mr-3 text-accent" />,
    title: '5. "Be Present — as in PRESENT!"',
    content:
      "Hindi pwede yung katawan mo lang andun. Attend, participate, makisali, makisaya. Walang tago squad. No skip sessions. This camp is better when YOU show up.",
  },
  {
    icon: <Moon className="h-5 w-5 mr-3 text-primary" />,
    title: '6. "Curfew is Care-few"',
    content:
      "Curfew ≠ killjoy. Curfew = we care about your safety. Lights out means pahinga. Bukod sa schedule, kailangan mo rin ng reset!",
  },
  {
    icon: <Smile className="h-5 w-5 mr-3 text-yellow-500" />,
    title: '7. "Good Vibes, Godly Vibes"',
    content:
      "No foul words. No rude jokes. No romantic scenes na pang-K-drama. No bullying. Keep it wholesome, honest, and Christ-like. 🌤️",
  },
  {
    icon: <ShieldAlert className="h-5 w-5 mr-3 text-red-500" />,
    title: '8. "Bawal ang… You Know."',
    content:
      "Short version: No alcohol, no vape/cigarette, no drugs, no weapons, no nonsense. Long version: Basta kung bawal sa bahay at bawal sa church, bawal din dito.",
  },
  {
    icon: <Sparkles className="h-5 w-5 mr-3 text-accent" />,
    title: '9. "Friends, Fun, Fellowship!"',
    content:
      "Make friends! Sumali sa games! Sing, pray, laugh, learn! Enjoy every moment — hindi everyday may gantong experience. 🤝💛",
  },
  {
    icon: <Package className="h-5 w-5 mr-3 text-primary" />,
    title: '10. "Take Care of Your Stuff"',
    content:
      "Bag, phone, notes, tubig — alagaan mo yan. Hindi kami magpapa-lost and found marathon.",
  },
];

export function RulesSection() {
  return (
    <section id="rules" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            🦋 CI CAMP RULES 🦋
          </h2>
          <p className="mt-4 text-lg md:text-xl font-semibold">
            Para Masaya, Safe, at Solid ang Camp Experience!
          </p>
          <p className="mt-2 text-muted-foreground">
            (Basahin 'to! Promise hindi boring.)
          </p>
        </div>
        <div className="mx-auto max-w-4xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {rules.map((rule, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-medium hover:no-underline text-left">
                  <div className="flex items-center">
                    {rule.icon}
                    {rule.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-8">
                  {rule.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 p-6 bg-accent/10 rounded-lg border-2 border-accent/20">
            <h3 className="text-xl font-bold text-center mb-2">
              🌈 LET'S MAKE THIS CAMP:
            </h3>
            <p className="text-center text-lg font-semibold">
              SAFE. FUN. SPIRIT-FILLED. UNFORGETTABLE.
            </p>
            <p className="text-center text-muted-foreground mt-4">
              Ang camp ay hindi lang event — encounter 'to with God at with new friends. 
              Kaya let's keep the rules, respect each other, at enjoyin ang bawat araw. 🙌✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
