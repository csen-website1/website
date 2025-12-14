import Emails from "@/components/messages";
import CreateTesto from "@/components/add-testimonials";
import Urls from "@/components/Urls";

export default async function Page() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenue dans votre espace d'administration</p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Messages - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Emails />
        </div>

        {/* Right Column - Stacked cards */}
        <div className="space-y-6">
          <CreateTesto />
          <Urls />
        </div>
      </div>
    </div>
  );
}
