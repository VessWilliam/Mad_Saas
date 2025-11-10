import { h } from "vue";
import { useAntd } from "~/composables/useAntd";

const { AButton, ATag } = useAntd();

export const gameColumns = (emit: any) => [
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Genre", dataIndex: "genre", key: "genre" },
  { title: "Platform", dataIndex: "platform", key: "platform" },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    customRender: ({ text }: any) => `$${text.toFixed(2)}`,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    customRender: ({ text }: any) =>
      h(ATag, { color: text === "Available" ? "green" : "orange" }, () => text),
  },
  {
    title: "Actions",
    key: "actions",
    customRender: ({ record }: any) => [
      h(
        AButton,
        { type: "link", onClick: () => emit("edit", record) },
        () => "Edit"
      ),
      h(
        AButton,
        {
          type: "link",
          danger: true,
          onClick: () => emit("delete", record.id),
        },
        () => "Delete"
      ),
    ],
  },
];
