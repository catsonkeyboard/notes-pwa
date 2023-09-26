import { useEffect, useState } from "react";
import NotesIcon from "./assets/note_icon.png";
import PlusIcon from "./assets/plus_icon.png";
import DeleteIcon from "./assets/delete_icon.png";
import "./App.scss";
import dayjs from "dayjs";

function App() {
  const [notes, setNotes] = useState<Array<Record<string, string>>>([]);
  const [activeNote, setActiveNote] = useState(0);
  const [activeNoteContent, setActiveNoteContent] = useState("");

  const updateNotes = (updates: Array<Record<string, string>>) => {
    setNotes([...updates]);
  };

  const addNote = () => {
    const newNote = {
      title: "",
      content: "",
      created_at: `${dayjs().format("ddd, DD MMMM YYYY")} at ${dayjs().format(
        "hh:mm A",
      )}`,
    };
    updateNotes([{ ...newNote }, ...notes]);
    setActiveNote(0);
  };

  const deleteNote = (noteID: number) => {
    notes.slice(noteID, 1);
    updateNotes(notes);
    if (activeNote >= noteID) {
      setActiveNote(activeNote >= 1 ? activeNote - 1 : 0);
    }
  };

  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    console.log(value);
    if (notes.length === 0) return;
    const header = value.split(/\r?\n/)[0];
    if (notes.length !== 0 && notes[activeNote].title !== header) {
      notes[activeNote].title = header;
      notes[activeNote].content = value;
      updateNotes([...notes]);
    }
  };

  return (
    <div className="container">
      <div className="container__left">
        <div className="container__left__header">
          <div className="container__left__header__title_and_logo">
            <img src={NotesIcon} alt="Notes Icon" />
            <p>My Notes</p>
          </div>
          <div className="container__left__header__action" onClick={addNote}>
            <img src={PlusIcon} alt="Add New Note Icon" />
            <p>New Note</p>
          </div>
        </div>
        <div className="container__left__content">
          {notes.map((item, index) => (
            <div
              key={`${item.title}_${index}`}
              className={`container__left__content__row ${
                index === activeNote && "active"
              }`}
              onClick={() => setActiveNote(index)}
            >
              <div className="container__left__content__row__left">
                <p className="container__left__content__row__left__title">
                  {item.title || "Untitled"}
                </p>
                <p className="container__left__content__row__left__date">
                  {item.created_at}
                </p>
              </div>
              <img
                src={DeleteIcon}
                alt="Delete Note Icon"
                className="container__left__content__row__action"
                onClick={() => deleteNote(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="container__right">
        <p className="container__right__date">
          {notes[activeNote]?.created_at}
        </p>
        <textarea
          name="note_input"
          placeholder="Write Your Note Here"
          onChange={handleChange}
          value={notes[activeNote]?.content}
        ></textarea>
      </div>
    </div>
  );
}

export default App;
