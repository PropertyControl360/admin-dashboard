// import './terns_and_conditions_display.scss';

interface SectionProps {
    title: string;
    notes: { label: string; content: string }[];
}

const Section: React.FC<SectionProps> = ({ title, notes }: SectionProps) => (
    <div>
        <div className="section-title">{title}</div>
        <div className="section-notes">
            {notes.map((note, index) => (
                <div key={index}>
                    <strong>{note.label} </strong>
                    <span>{note.content}</span>
                </div>
            ))}
        </div>
    </div>
);


export default Section;