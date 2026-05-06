import { Navigation } from "@/components";

export default function About() {
    return (
        <div>
            <Navigation />
            <h1 className="text-4xl ml-2 mt-3">About</h1>

            <div className="ml-4 mt-4">
                <button className="standard-button p-2 m-5">Primary</button>
                <button className="standard-button-secondary p-2">Secondary</button>
            </div>

            <div className="">
                <div className="text-3xl mb-2">
                    Here is something that can be on the page as a heading of sorts
                </div>
            </div>
            <div className="">
                <div className="text-m">
                    Here are some things that are part of the paragraph
                    with lots and lots of words and all sorts of other things.  Banana man took
                    his banana stand to Zanarkand!
                </div>
            </div>
        </div>
    )
}