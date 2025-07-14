
import {useState} from 'react'

type ChunkItemProps = {
  idx: number;
  text: string;
};


function ChunkItem({ idx, text }: ChunkItemProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="">
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-gray-500 hover:bg-gray-400 px-2 py-1 rounded-full text-sm"
      >
        chunk{idx+1}
      </button>

      {open && (
        <div className=" top-full left-0 mt-1 bg-gray-500 text-sm border p-2 rounded shadow-md z-10">
          {text}
        </div>
      )}

    </div>
  )
}
export default ChunkItem