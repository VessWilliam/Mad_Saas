import { h } from "vue";
import { useAntd } from "~/composables/useAntd";

const { AButton, ATag } = useAntd();

export const tableColumns = (emit: any) => [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Genre",
    dataIndex: "genre",
  },
  {
    title: "Platform",
    dataIndex: "platform",
  },
  {
    title: "Price",
    dataIndex: "price",
    customRender: ({ text }: any) => {
      const value = Number(text);
      return isNaN(value) ? "—" : `$${value.toFixed(2)}`;
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    customRender: ({ text }: any) =>
      h(ATag, { color: text === "Available" ? "green" : "orange" }, () => text),
  },
  {
    title: "Actions",
    customRender: ({ record }: any) =>
      h("div", { class: "flex gap-2" }, [
        h(
          AButton,
          {
            type: "link",
            onClick: () => emit("edit", record),
          },
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
      ]),
  },
];
