import { 
  Layout, LayoutSider, LayoutHeader, LayoutContent,
  Menu, MenuItem,
  Select,
  Card, Row, Col,
  Button, Table, Tag,
  Modal, Form, FormItem, Input, InputNumber,
  ConfigProvider, theme,
  Drawer
} from 'ant-design-vue'

export const useAntd = () => ({
  ALayout: Layout,
  ALayoutSider: LayoutSider,
  ALayoutHeader: LayoutHeader,
  ALayoutContent: LayoutContent,
  AMenu: Menu,
  AMenuItem: MenuItem,
  ACard: Card,
  ARow: Row,
  ACol: Col,
  AButton: Button,
  ATable: Table,
  ATag: Tag,
  AModal: Modal,
  AForm: Form,
  AFormItem: FormItem,
  AInput: Input,
  ANumberPicker: InputNumber,
  ASelect: Select,
  AConfigProvider: ConfigProvider,
  ATheme: theme,
  ADrawer:Drawer
})