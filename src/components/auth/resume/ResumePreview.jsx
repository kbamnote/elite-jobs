import { useLocation } from "react-router-dom";

export default function ResumePreview() {
    const { state } = useLocation();

    if (!state) return <p>No data found</p>;

    return (
        <div className="min-h-screen bg-[#f7f5ef] p-8 grid lg:grid-cols-2 gap-8">
            {/* LEFT DETAILS */}
            <div className="bg-white rounded-2xl p-6">
                <h1 className="text-2xl font-bold">{state.name}</h1>
                <p className="text-gray-500">{state.title}</p>

                <div className="mt-4 space-y-2 text-sm">
                    <p>Email: {state.email}</p>
                    <p>Phone: {state.phone}</p>
                    <p>Location: {state.location}</p>
                </div>
            </div>

            {/* RIGHT PREVIEW */}
            <div className="bg-white rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Resume Preview</h2>
                <div className="border p-4 rounded-lg">
                    <h3 className="font-bold">{state.name}</h3>
                    <p>{state.title}</p>
                    <p>{state.email}</p>
                    <p>{state.phone}</p>
                    <p>{state.location}</p>
                </div>
            </div>
        </div>
    );
}