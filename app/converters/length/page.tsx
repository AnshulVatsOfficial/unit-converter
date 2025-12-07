import LengthConverter from "@/components/converters/length/Length";
import { Zap, Shield, Globe } from "lucide-react";

export default function LengthConverterPage() {
  return (
    <>
      <title>
        Length Converter - Convert Meters, Feet, Inches, Miles & More |
        UnitConvert
      </title>
      <meta
        name="description"
        content="Free online length converter. Instantly convert between meters, kilometers, feet, inches, miles, yards, and 20+ length units. Fast, accurate, and easy to use."
      />
      <meta
        name="keywords"
        content="length converter, unit converter, meters to feet, km to miles, inches to cm, length conversion"
      />
      <link rel="canonical" href="/length" />

      <div className="min-h-screen flex flex-col items-center bg-background overflow-auto">
        <main className="flex-1">
          {/* Converter Section */}
          <section className="p-4">
            <LengthConverter />
          </section>

          {/* Info Section */}
          <section className="px-4 py-12 md:py-16 bg-muted/30">
            <div className="container max-w-4xl">
              <h2 className="text-2xl font-semibold mb-8 text-center">
                Why Use Our Length Converter?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="converter-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">
                    See all conversions update in real-time as you type. No page
                    reloads needed.
                  </p>
                </div>

                <div className="converter-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">High Precision</h3>
                  <p className="text-sm text-muted-foreground">
                    Accurate calculations with up to 10 decimal places for
                    scientific applications.
                  </p>
                </div>

                <div className="converter-card p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">20+ Units</h3>
                  <p className="text-sm text-muted-foreground">
                    From nanometers to light-years, we cover all common and
                    scientific length units.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="py-12 md:py-16">
            <div className="container max-w-3xl">
              <article className="prose prose-gray max-w-none">
                <h2 className="text-2xl font-semibold mb-4">
                  About Length Conversion
                </h2>
                <p className="text-muted-foreground mb-4">
                  Length is one of the fundamental physical quantities used to
                  measure the extent of an object or the distance between two
                  points. Different measurement systems have evolved across the
                  world, with the metric system (meters) being the most widely
                  adopted internationally, while the imperial system (feet,
                  inches, miles) remains common in the United States and United
                  Kingdom.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-3">
                  Common Length Conversions
                </h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>
                    <strong>1 meter</strong> = 100 centimeters = 3.28084 feet =
                    39.3701 inches
                  </li>
                  <li>
                    <strong>1 kilometer</strong> = 1000 meters = 0.621371 miles
                  </li>
                  <li>
                    <strong>1 mile</strong> = 1.60934 kilometers = 5280 feet
                  </li>
                  <li>
                    <strong>1 inch</strong> = 2.54 centimeters = 25.4
                    millimeters
                  </li>
                  <li>
                    <strong>1 foot</strong> = 12 inches = 0.3048 meters
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-3">
                  Supported Units
                </h3>
                <p className="text-muted-foreground">
                  Our converter supports metric units (meter, kilometer,
                  centimeter, millimeter, micrometer, nanometer), imperial units
                  (mile, yard, foot, inch), nautical units (nautical mile,
                  fathom), astronomical units (light-year, astronomical unit,
                  parsec), and historical units (furlong, chain, rod, league).
                </p>
              </article>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
