export default function Section({ title, children }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <div>{children}</div>
        </div>
    );
}
