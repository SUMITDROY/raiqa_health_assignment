'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";


export default function Home() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  function increaseCount() {
    setCount(count + 1);
  }
  function decreaseCount() {
    if (count > 0) setCount(count - 1);
  }
  function reset() {
    setCount(0);
  }
  function clearList() {
    setList([]);
  }
  function addToList() {
    if (count > 0) {
      setList([...list, count]);
      setCount(0);
    }
  }
  function toggleSort() {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sorted = [...list].sort((a, b) =>
      newOrder === "asc" ? a - b : b - a
    );
    setList(sorted);
  }
  function removeItem(index: number) {
    setList(list.filter((_, i) => i !== index));
  }

  return (
   <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-white px-4 py-6">
  {/* Footer aligned right without causing horizontal overflow */}
  <div className="flex justify-end w-full mb-4 overflow-x-hidden">
    <Footer />
  </div>

  <div className="mx-auto max-w-3xl flex flex-col items-center gap-8">
    <header className="w-full text-center px-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
        Counter & List
      </h1>
      <p className="mt-2 text-sm text-white">
        Increment numbers, add them to a list, sort, and manage items.
      </p>
    </header>

    {/* Counter Card */}
    <Card className="bg-zinc-900/70 border-zinc-800/80 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <span className="inline-flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          Counter
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={decreaseCount}
            className="w-10 h-10 text-lg rounded-full border border-zinc-700/60 bg-zinc-800/60 hover:bg-zinc-700 text-white"
          >
            –
          </Button>
          <div className="relative">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight tabular-nums text-white">
              {count}
            </span>
            <div className="absolute -inset-1 -z-10 rounded-xl blur-md opacity-5 bg-blue-500" />
          </div>
          <Button
            variant="secondary"
            onClick={increaseCount}
            className="w-10 h-10 text-lg rounded-full border border-zinc-700/60 bg-zinc-800/60 hover:bg-zinc-700 text-white"
          >
            +
          </Button>
        </div>
        <Button
          onClick={addToList}
          className="w-full bg-blue-600 hover:bg-blue-600/90 text-white shadow-sm"
        >
          Add to List
        </Button>
      </CardContent>
    </Card>

    {/* List Card */}
    <Card className="bg-zinc-900/70 border-zinc-800/80 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl w-full">
      <CardHeader className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-3">
        <CardTitle className="text-lg text-white">Numbers List</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button variant="destructive" size="sm" onClick={reset}>
            Reset
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={clearList}
            className="border border-zinc-700/60 bg-zinc-800/60 hover:bg-zinc-700 text-white"
          >
            Clear List
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleSort}
            className="border border-zinc-700/60 bg-zinc-800/60 hover:bg-zinc-700 text-white"
          >
            Sort {sortOrder === "asc" ? "↑" : "↓"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
            <div className="h-10 w-10 rounded-full bg-zinc-800/70 flex items-center justify-center text-white">
              0
            </div>
            <p className="text-sm text-white">
              No items yet. Add a number from the counter.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {list.map((num, index) => (
              <li
                key={`${num}-${index}`}
                className="group flex items-center justify-between rounded-md border border-zinc-800/80 bg-zinc-900/60 px-3 py-2 hover:bg-zinc-900 text-white"
              >
                <span className="font-medium">
                  {num}
                  <span className="ml-2 text-xs text-white">#{index + 1}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-white hover:text-red-400 hover:bg-red-400/10"
                >
                  ✕
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

     <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2 border-t border-zinc-800 pt-3">
  <div className="text-xs text-white">
    Total numbers: {list.length}
  </div>
  {list.length > 0 && (
    <div className="text-xs text-white">
      {sortOrder === "asc" ? "Ascending" : "Descending"}
    </div>
  )}
</CardFooter>

    </Card>

    <footer className="w-full text-center text-xs text-white">
      Tip: Use Sort to toggle order. Reset clears the counter. Clear List wipes the list.
    </footer>
  </div>
</div>

  );
}
