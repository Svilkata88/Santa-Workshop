import ChristmasTimeLeft from '../components/CristmasTimeLeft';

export default function Home() {

    return (
        <div className="relative h-[calc(100vh-56px)] w-full overflow-hidden">
            {/* Background video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src="/video/welcomeVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <ChristmasTimeLeft targetDate={'2025-12-31T00:00:00'} />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content on top */}
            <div className="relative z-10 flex h-full items-center justify-center text-white text-center">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Santa Workshop 🎅</h1>
                    <p className="text-lg">Create magic orders effortlessly</p>
                </div>
            </div>
        </div>

    )
};  