import { problems } from "@/problems/problemData";
import ProblemBtn from "@/components/ProblemBtn";

export default function ProblemsPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-3xl font-bold">Problems</h1>
                <p className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    This is the problems page.
                </p>
                <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
                    {problems.map((problem, index) => (
                        <ProblemBtn
                            key={index}
                            id={problem.id}
                            title={problem.name}
                            description={problem.description}
                            level={problem.difficulty}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}