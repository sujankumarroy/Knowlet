import SelectInput from "@/components/ui/select-input";
import TextInput from "@/components/ui/text-input";
import { useEffect, useState } from "react";

interface Details {
  title: string;
  description: string;
  target: string;
  type: string;
  slug: string;
  path: string;
}

export default function ResourceDetails({
  details,
  setDetails,
}: {
  details: Details;
  setDetails: (details: Details) => void;
}) {
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [level, setLevel] = useState("Semester 1");
  const [subject, setSubject] = useState("Ecology");
  const [paper, setPaper] = useState("DSC");
  const [type, setType] = useState("Note");
  const [target, setTarget] = useState("Unit 1");

  useEffect(() => {
    let path = `${level}/${subject}`;

    if (level.startsWith("Semester")) path += `/${paper}/${type}`;

    if (type !== "PYQ") path += `/${target}`;

    setDetails({
      ...details,
      title,
      description,
      path,
      type,
      target,
      slug: "demo--23",
    });
  }, [title, description, level, subject, paper, type, target]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Resource Details</h2>

      <div className="mt-6 space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Basic Information
          </h3>

          <div className="grid gap-5 md:grid-cols-2">
            <TextInput
              onChange={(e) =>
                setDetails({ ...details, title: e.target.value })
              }
              label="Resource Title"
              placeholder="Enter title"
            />
            <TextInput
              onChange={(e) =>
                setDetails({ ...details, description: e.target.value })
              }
              label="Description"
              placeholder="Resource Description"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Categorization
          </h3>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <SelectInput
              label="Level"
              options={[
                "Semester 1",
                "Semester 2",
                "Semester 3",
                "Semester 4",
                "Semester 5",
                "Semester 6",
                "Semester 7",
                "Semester 8",
              ]}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />

            <SelectInput
              label="Resource Type"
              options={["Notes", "PYQ", "Important Questions"]}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <SelectInput
              label="Subject"
              options={[
                "zoology",
                "statistics",
                "political-science",
                "physics",
                "philosophy",
                "mathematics",
                "history",
                "geology",
                "environmental-science",
                "education",
                "economics",
                "ecology",
                "computer-science",
                "computer-application",
                "chemistry",
                "botany",
                "biotechnology",
              ]}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <SelectInput
              label="Paper"
              options={["DSC", "DSM", "SEC", "IDC"]}
              value={paper}
              onChange={(e) => setPaper(e.target.value)}
            />

            <SelectInput
              label="target"
              options={[
                "Unit 1",
                "Unit 2",
                "Unit 3",
                "Unit 4",
                "Unit 5",
                "Unit 6",
                "Unit 7",
                "Unit 8",
                "Unit 9",
                "Unit 10",
                "Unit 11",
                "Unit 12",
                "Unit 13",
                "Unit 14",
              ]}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
