import { problems, Difficulty } from "@/problems/problemData";
import ProblemBtn from "@/components/ProblemBtn";

export default function ProblemsPage() {
    return (
        <div className="flex flex-col gap-8 p-4 my-25 mx-6 sm:p-8 bg-neutral-900 border border-neutral-600/40 rounded-2xl">
            <h1 className="flex text-5xl text-neutral-200 font-bold justify-center">Explore</h1>

            <div className="flex flex-col mx-10 gap-y-7">

                <div className="relative flex flex-col gap-4">
                    <div className="ml-5 text-3xl font-bold text-center sm:text-left text-green-300">
                        Beginner
                    </div>
                    <div className="relative">
                        {/* Gradient overlay on the left */}
                        <div className="absolute left-0 top-0 h-full w-18 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none z-10"></div>

                        {/* Gradient overlay on the right */}
                        <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none z-10"></div>

                        {/* Scrollable row */}
                        <div className="flex flex-row ml-10 gap-4 items-center overflow-x-auto scrollbar-hide">
                            {problems
                                .filter((problem) => problem.difficulty === Difficulty.Beginner)
                                .map((problem, index) => (
                                    <ProblemBtn
                                        key={index}
                                        id={problem.id}
                                        title={problem.name}
                                        description={problem.description}
                                        level={problem.difficulty}
                                    />
                                ))}
                        </div>
                    </div>
                </div>

                <div className="border border-neutral-600/30 rounded-lg"></div>

                <div className="relative flex flex-col gap-4">
                    <div className="ml-5 text-3xl font-bold text-center sm:text-left text-orange-300">
                        Intermediate
                    </div>
                    <div className="relative">
                        {/* Gradient overlay on the left */}
                        <div className="absolute left-0 top-0 h-full w-18 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none z-10"></div>

                        {/* Gradient overlay on the right */}
                        <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none z-10"></div>

                        {/* Scrollable row */}
                        <div className="flex flex-row ml-10 gap-4 items-center overflow-x-auto scrollbar-hide">
                            {problems
                                .filter((problem) => problem.difficulty === Difficulty.Intermediate)
                                .map((problem, index) => (
                                    <ProblemBtn
                                        key={index}
                                        id={problem.id}
                                        title={problem.name}
                                        description={problem.description}
                                        level={problem.difficulty}
                                    />
                                ))}
                        </div>
                    </div>
                </div>

                <div className="border border-neutral-600/30 rounded-lg"></div>

                <div className="relative flex flex-col gap-4">
                    <div className="ml-5 text-3xl font-bold text-center sm:text-left text-red-300">
                        Advance
                    </div>
                    <div className="relative">
                        {/* Gradient overlay on the left */}
                        <div className="absolute left-0 top-0 h-full w-18 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none z-10"></div>

                        {/* Gradient overlay on the right */}
                        <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none z-10"></div>

                        {/* Scrollable row */}
                        <div className="flex flex-row gap-4 ml-10 items-center overflow-x-auto scrollbar-hide">
                            {problems
                                .filter((problem) => problem.difficulty === Difficulty.Advanced)
                                .map((problem, index) => (
                                    <ProblemBtn
                                        key={index}
                                        id={problem.id}
                                        title={problem.name}
                                        description={problem.description}
                                        level={problem.difficulty}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}