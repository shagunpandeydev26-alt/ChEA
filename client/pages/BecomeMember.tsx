import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { siteImages } from "@/lib/images";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Check,
  GraduationCap,
  Heart,
  Mail,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";

type PlanId = "student" | "faculty" | "alumni";

const donationPresets = [300, 500, 1000, 2500];

const benefits = [
  {
    icon: Ticket,
    title: "Free Conference Access",
    description: "Attend ChEA conferences and technical symposia without a participation fee.",
  },
  {
    icon: Mail,
    title: "Formal Invitations",
    description: "Receive formal invitations for workshops, seminars and department celebrations.",
  },
  {
    icon: Users,
    title: "Designated Sessions",
    description: "Get access to members-only sessions, talks and interactive discussions.",
  },
  {
    icon: Heart,
    title: "Hospitality Support",
    description: "On-ground assistance and hospitality during ChEA-hosted events.",
  },
  {
    icon: Sparkles,
    title: "Showcase on Our Website",
    description: "Your name and contribution featured on the ChEA website and event highlights.",
  },
  {
    icon: CalendarDays,
    title: "Priority Event Updates",
    description: "Early access to event announcements, schedules and registration links.",
  },
];

export default function BecomeMember() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("student");
  const [donationAmount, setDonationAmount] = useState(300);

  const planLabel =
    selectedPlan === "student"
      ? "Student Membership (₹200 + GST)"
      : selectedPlan === "faculty"
        ? "Faculty Membership (₹1000 + GST)"
        : `Alumni Donation (₹${donationAmount} + GST)`;

  const applyHref = `mailto:chea@hbtu.ac.in?subject=${encodeURIComponent(
    "ChEA Membership",
  )}&body=${encodeURIComponent(`I would like to continue with: ${planLabel}`)}`;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${siteImages.joinCta}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 text-center text-white py-28">
          <p className="text-chea-red uppercase tracking-[0.3em] text-sm mb-4">
            Membership
          </p>
          <h1 className="text-5xl lg:text-7xl font-light mb-6 leading-tight">
            Become a <span className="text-chea-red">Member</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the Chemical Engineering Association community and unlock
            conferences, sessions, invitations and a whole lot more.
          </p>
        </div>
      </section>

      <section className="py-20 bg-chea-dark">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
              Choose Your Membership
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pick the option that describes you best. Every membership helps
              us grow the ChEA community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-chea-dark-card border border-chea-red/20 hover:border-chea-red/60 transition-colors rounded-lg p-8 flex flex-col">
              <GraduationCap className="w-10 h-10 text-chea-red mb-6" />
              <h3 className="text-2xl font-light text-white mb-2">Students</h3>
              <div className="text-4xl font-bold text-chea-red mb-2">₹200</div>
              <div className="text-gray-400 text-sm mb-6">+ GST</div>
              <p className="text-gray-300 leading-relaxed mb-8 flex-1">
                For undergraduate and postgraduate students of chemical
                engineering who want to be part of everything ChEA does.
              </p>
              <Button
                type="button"
                variant={selectedPlan === "student" ? "default" : "outline"}
                className={
                  selectedPlan === "student"
                    ? "bg-chea-red hover:bg-chea-red-dark text-white border-0 w-full"
                    : "border-chea-red/40 text-white hover:bg-chea-red/20 w-full"
                }
                onClick={() => setSelectedPlan("student")}
              >
                {selectedPlan === "student" ? "Selected" : "Select Student"}
              </Button>
            </div>

            <div className="bg-chea-dark-card border border-chea-red/20 hover:border-chea-red/60 transition-colors rounded-lg p-8 flex flex-col">
              <Briefcase className="w-10 h-10 text-chea-red mb-6" />
              <h3 className="text-2xl font-light text-white mb-2">
                Faculty Members
              </h3>
              <div className="text-4xl font-bold text-chea-red mb-2">
                ₹1000
              </div>
              <div className="text-gray-400 text-sm mb-6">+ GST</div>
              <p className="text-gray-300 leading-relaxed mb-8 flex-1">
                For faculty, researchers and mentors who guide and support the
                next generation of chemical engineers.
              </p>
              <Button
                type="button"
                variant={selectedPlan === "faculty" ? "default" : "outline"}
                className={
                  selectedPlan === "faculty"
                    ? "bg-chea-red hover:bg-chea-red-dark text-white border-0 w-full"
                    : "border-chea-red/40 text-white hover:bg-chea-red/20 w-full"
                }
                onClick={() => setSelectedPlan("faculty")}
              >
                {selectedPlan === "faculty" ? "Selected" : "Select Faculty"}
              </Button>
            </div>

            <div className="bg-chea-dark-card border border-chea-red/20 hover:border-chea-red/60 transition-colors rounded-lg p-8 flex flex-col">
              <Heart className="w-10 h-10 text-chea-red mb-6" />
              <h3 className="text-2xl font-light text-white mb-2">Alumni</h3>
              <div className="text-4xl font-bold text-chea-red mb-2">
                ₹{donationAmount}
              </div>
              <div className="text-gray-400 text-sm mb-6">+ GST</div>
              <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                Support ChEA as an alumnus. Your contribution goes directly
                back into student activities and events.
              </p>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {donationPresets.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setDonationAmount(amount);
                        setSelectedPlan("alumni");
                      }}
                      className={`px-3 py-2 rounded text-sm transition-colors ${
                        donationAmount === amount
                          ? "bg-chea-red text-white"
                          : "bg-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <label htmlFor="donation-amount" className="text-gray-400 text-sm">
                    Other
                  </label>
                  <input
                    id="donation-amount"
                    type="number"
                    min={300}
                    step={100}
                    value={donationAmount}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setDonationAmount(Math.max(300, value || 300));
                      setSelectedPlan("alumni");
                    }}
                    className="w-32 rounded border border-white/20 bg-black/40 px-3 py-2 text-white text-sm focus:outline-none focus:border-chea-red"
                  />
                  <span className="text-gray-400 text-sm">+ GST</span>
                </div>
              </div>
              <Button
                type="button"
                variant={selectedPlan === "alumni" ? "default" : "outline"}
                className={
                  selectedPlan === "alumni"
                    ? "bg-chea-red hover:bg-chea-red-dark text-white border-0 w-full"
                    : "border-chea-red/40 text-white hover:bg-chea-red/20 w-full"
                }
                onClick={() => setSelectedPlan("alumni")}
              >
                {selectedPlan === "alumni" ? "Selected" : "Select Alumni"}
              </Button>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-gray-300">Selected: {planLabel}</p>
            <Button size="lg" asChild className="bg-chea-red hover:bg-chea-red-dark text-white px-8 py-3 text-lg">
              <a href={applyHref}>
                Continue <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
              Benefits &amp; Perks
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A little support goes a long way. Here is what your membership
              gives you back.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-chea-dark-card border border-chea-red/20 rounded-lg p-8"
                >
                  <Icon className="w-8 h-8 text-chea-red mb-5" />
                  <h3 className="text-xl font-light text-white mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-chea-red" />
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
