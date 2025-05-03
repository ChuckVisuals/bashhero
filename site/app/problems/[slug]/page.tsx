"use client";
import { useParams } from 'next/navigation';
import BashTerminal from "@/components/Terminal";
import { problems } from "@/problems/problemData";
import ReactMarkdown from "react-markdown";
import dedent from "dedent";
import { useRef, useState, useEffect } from "react";

const ProblemPage = () => {
    const { slug } = useParams();
    const terminalRef = useRef<{ runCommands: (commands: string[]) => void } | null>(null);

    // State to store window dimensions
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    // Effect to update window dimensions on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial size
        handleResize();

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //console.log("Window size:", windowSize);

    // Find the problem by slug
    const problem = problems.find((p) => p.id === slug);

    // If no problem is found, return a 404-like message
    if (!problem) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-4xl text-white">404 - Problem Not Found</h1>
            </div>
        );
    }

    // Function to handle running tests
    const handleRunTests = () => {
        if (terminalRef.current) {
            terminalRef.current.runCommands(problem.testCases);
        }
    };

    // Wait until windowSize is updated with real dimensions
    if (windowSize.width === 0 || windowSize.height === 0) {
        return null; // Render nothing until dimensions are available
    }

    var term1Height = Math.floor(windowSize.height * 0.030704);
    var term1Width = Math.floor(windowSize.width * 0.040479);

    var term2Height = Math.floor(windowSize.height * 0.012611);
    var term2Width = Math.floor(windowSize.width * 0.10);


    // If the problem is found, render its details with terminals
    return (
        <div className="h-screen flex flex-col gap-4 mt-20">
            <div className="flex flex-row gap-x-20 bg-neutral-900 border border-neutral-600 rounded-lg p-4 mx-4 justify-between h-2/3">
                <div className="w-1/2 overflow-hidden">
                    <h1 className="text-2xl text-white">{problem.name}</h1>
                    <div className="prose prose-stone prose max-w-5xl prose-invert p-8 mt-4 border border-neutral-600 rounded-lg bg-neutral-800 max-h-9/10 overflow-y-auto">
                        <ReactMarkdown>{dedent(problem.description)}</ReactMarkdown>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-4">
                    <h1 className="text-2xl text-white">Bash Hero</h1>
                    <div className="border border-neutral-600 rounded-lg p-1">
                        <BashTerminal preConfig={problem} termSettings={[term1Height, term1Width, true]} terminalId="terminal-bashing" />
                    </div>

                </div>
            </div>
            <div className="flex flex-col justify-between bg-neutral-900 border border-neutral-600 rounded-lg p-4 mx-4 h-1/3">
                <div className="flex flex-row items-center">
                    <div className="text-2xl text-white">Test/Cases</div>
                    <button className="ml-auto border border-neutral-600 bg-neutral-800 text-white rounded-lg px-4 py-2 hover:bg-neutral-700 hover:cursor-pointer duration-800" onClick={handleRunTests}>
                        Run Tests
                    </button>
                </div>
                <BashTerminal ref={terminalRef} preConfig={problem} termSettings={[term2Height, term2Width, false]} terminalId="terminal-testing" />
            </div>
        </div>

    )
};

export default ProblemPage;