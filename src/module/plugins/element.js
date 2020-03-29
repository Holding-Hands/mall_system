import Vue from 'vue';
import {
    Button, // element - Button
    Badge, // element - Badge
    Col, // element - Col
    Container, // element - Container
    Checkbox, // element - Checkbox
    Dialog, // element - Dialog
    Footer, // element - Footer
    Header, // element - Header
    Input, // element - Input
    Loading, // element - Loading
    Main, // element - Main
    Menu, // element - Menu
    MenuItem, // element - MenuItem
    MenuItemGroup, // element - MenuItemGroup
    MessageBox, // element - MessageBox
    Message, // element - Message
    Radio, // element - Radio
    RadioGroup, // element - RadioGroup
    RadioButton, // element - RadioButton
    Row, // element - Row
    Switch, // element - Switch
    Slider, // Slider
    Tag, // element - Tag
    Table, // element - Table
    TableColumn, // element - TableColumn
    Notification, // element - Notification
    Submenu, // element - Submenu
    Pagination, // element - Pagination
    Form, // element - Form
    FormItem, // element - FormItem
    Select, // element - Select
    Option, // element - Option
    Progress, // element - Progress
    Popover, // element - Popover
    CheckboxGroup, // element - CheckboxGroup
    CascaderPanel, // element - CascaderPanel
    DatePicker, // element - DatePicker
    Card, // Card
    TimePicker, // element - TimePicker
    Autocomplete, // element - Autocomplete
    Cascader, // Cascader
    Tree, // element - Tree
    Tooltip, // element - Tooltip
    Tabs, // element - Tabs
    TabPane, // element - TabPane
    Dropdown, // element - Dropdown
    DropdownMenu, // element - DropdownMenu
    DropdownItem, // element - DropdownItem
    InfiniteScroll, // InfiniteScroll
    Timeline, // element - Timeline
    TimelineItem, // element - TimelineItem
    Upload // element - Upload
} from 'element-ui';

[
    Button, // element - Button
    Badge, // element - Badge
    Col, // element - Col
    Container, // element - Container
    Checkbox, // element - Checkbox
    Dialog, // element - Dialog
    Footer, // element - Footer
    Header, // element - Header
    Input, // element - Input
    Loading, // element - Loading
    Main, // element - Main
    Menu, // element - Menu
    MenuItem, // element - MenuItem
    MenuItemGroup, // element - MenuItemGroup
    Radio, // element - Radio
    RadioGroup, // element - RadioGroup
    RadioButton, // element - RadioButton
    Row, // element - Row
    Switch, // element - Switch
    Slider, // Slider
    Tag, // element - Tag
    Table, // element - Table
    TableColumn, // element - TableColumn
    Submenu, // element - Submenu
    Pagination, // element - Pagination
    Form, // element - Form
    FormItem, // element - FormItem
    Select, // element - Select
    Option, // element - Option
    Progress, // element - Progress
    Popover, // element - Popover
    CheckboxGroup, // element - CheckboxGroup
    CascaderPanel, // element - CascaderPanel
    DatePicker, // element - DatePicker
    Card, // Card
    TimePicker, // element - TimePicker
    Autocomplete, // element - Autocomplete
    Cascader, // Cascader
    Tree, // element - Tre
    Tooltip, // Tooltip
    Tabs, // element - Tabs
    TabPane, // element - TabPane
    Dropdown, // element - Dropdown
    DropdownMenu, // element - DropdownMenu
    DropdownItem, // element - DropdownItem
    InfiniteScroll, // InfiniteScroll
    Timeline, // element - Timeline
    TimelineItem, // element - TimelineItem
    Upload // element - Upload
].forEach((comp) => {
    Vue.use(comp);
});

Vue.prototype.$ELEMENT = { size: 'small' }; // ELEMENT
Vue.prototype.$loading = Loading.service; // loading
Vue.prototype.$msgbox = MessageBox; // msgbox
Vue.prototype.$alert = MessageBox.alert; // alert
Vue.prototype.$confirm = MessageBox.confirm; // confirm
Vue.prototype.$prompt = MessageBox.prompt; // prompt
Vue.prototype.$message = Message; // message
Vue.prototype.$notify = Notification; // notify
