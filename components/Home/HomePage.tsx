import Hero from './Hero';
import CTAStrip from './Ctastrip';
import AboutPage from './About';
import BuiltForEveryRole from './Builtforeveryrole';

export default function HomePage() {
    return (
        <div>
            <Hero />
            <CTAStrip />
            <AboutPage />
            <BuiltForEveryRole />
        </div>
    );
}
