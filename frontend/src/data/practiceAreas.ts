export interface PracticeAreaItem {
  id: number;
  title: string;
  description: string;
}

export const practiceAreas: PracticeAreaItem[] = [
  {
    id: 1,
    title: "Civil Matters",
    description:
      "Legal assistance relating to civil disputes, property matters, recovery matters and other civil proceedings.",
  },
  {
    id: 2,
    title: "Criminal Matters",
    description:
      "Legal representation and consultation in criminal complaints, bail matters and criminal court proceedings.",
  },
  {
    id: 3,
    title: "Family Matters",
    description:
      "Legal guidance relating to matrimonial disputes, maintenance, family disputes and related proceedings.",
  },
  {
    id: 4,
    title: "Property Matters",
    description:
      "Assistance with property disputes, ownership issues, possession and related legal matters.",
  },
  {
    id: 5,
    title: "Consumer Matters",
    description:
      "Legal assistance for consumer disputes involving goods, services and consumer rights.",
  },
  {
    id: 6,
    title: "Legal Consultation",
    description:
      "Professional consultation to understand legal options, documentation and appropriate next steps.",
  },
];