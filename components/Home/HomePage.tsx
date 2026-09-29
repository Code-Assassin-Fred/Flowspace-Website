import Hero from './Hero';
import CTAStrip from './Ctastrip';
import AboutPage from './About';
import BuiltForEveryRole from './Builtforeveryrole';
import Aicta from './Aicta';
import Pricing from './Pricing';

export default function HomePage() {
    return (
        <div>
            <Hero />
            <CTAStrip />
            <AboutPage />
            <BuiltForEveryRole />
            <Aicta />
            <Pricing />
        </div>
    );
}
