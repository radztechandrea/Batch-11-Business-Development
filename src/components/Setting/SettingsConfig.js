const settingsConfig = [
  {
    title: "Personal Information",
    sections: [
      {
        title: "Personal Details",
        description: "Fill in your personal details here.",
        fields: [
          {
            name: "Name",
            type: "text",
            defaultValue: "",
            uiComponent: "text",
            targetKey: "user.data.Name",
            description: "Enter your name",
            list: true,
          },
          {
            name: "Age",
            type: "number",
            defaultValue: "",
            uiComponent: "number",
            targetKey: "user.data.age",
            description: "Enter your age",
          },
          {
            name: "Gender",
            type: "select",
            defaultValue: "",
            uiComponent: "select",
            description: "Choose your gender",
            targetKey: "user.data.gender",
            options: [
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Others", label: "Others" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Policy",
    sections: [
      {
        title: "Attendance Policy",
        description: "Fill in your Attendance Policy details here.",
        fields: [
          {
            name: "No Noon Logs",
            type: "boolean",
            defaultValue: false,
            uiComponent: "toggle",
            targetKey: "user.policy.noNoonLogs",
            description: "If employees aren't necessarily needed to use biometrics at noon time",
          },
          {
            name: "No Absent on Special Holiday",
            type: "boolean",
            defaultValue: false,
            uiComponent: "toggle",
            targetKey: "user.policy.SpecialHoliday",
            description: "No absent will be recorded when employee is not present on special holiday",
          },
          {
            name: "Break (minutes)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.Break",
            description: "Given break time between am and pm",
          },
          {
            name: "Daily Regular Hours (hours)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.reghours",
            description: "Regular hours to be rendered by employee each day",
          },
        ],
      },
      {
        title: "Late Policy",
        description: "Fill in your Late Policy details here.",
        fields: [
          {
            name: "Late Grace Period (minutes)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.late.late",
            description: "Given grace period before late or tardiness will be applied",
          },
          {
            name: "Allow offsetting",
            type: "boolean",
            defaultValue: false,
            uiComponent: "toggle",
            targetKey: "user.policy.late.offset",
            description: "If minutes of late can be offset at the end of the schedule",
          },
          {
            name: "Late offsetting (minutes)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.late.lateoffsets",
            description: "Given minute of late that can be offset",
          },
          {
            name: "Minimum Overtime (minutes)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.late.minovertime",
            description: "Minimum minutes to meet before overtime will count",
          },
          {
            name: "Allowed Excess of Overtime (minutes)",
            type: "number",
            defaultValue: "0",
            uiComponent: "number",
            targetKey: "user.policy.late.maxovertime",
            description: "The remainder of total overtime in minutes divides by this will be removed",
          },
        ],
      },
    ],
  },
  {
    title: "Deduction",
    sections: [
      {
        title: "User Deduction",
        description: "Manage user deductions here.",
        fields: [
          {
            name: "User Deduction",
            type: "table",
            uiComponent: "table",
            targetKey: "user.deductions",
            columns: [
              {
                field: "code",
                headerName: "Deduction Code",
                width: 150,
              },
              {
                field: "desc",
                headerName: "Description",
                width: 250,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default settingsConfig;
