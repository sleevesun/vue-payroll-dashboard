import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CellData {
  val: number
  chg: number
  pct: number
}

export interface PayrollNode {
  id: string
  name: string
  level: number
  expanded: boolean
  desc: string
  people: CellData
  people_ot: CellData
  people_sev: CellData
  total: CellData
  salary: CellData
  ot_pay: CellData
  severance: CellData
  signing_bonus: CellData
  bonus: CellData
  social: CellData
  children?: PayrollNode[]
}

export interface FieldDefinition {
  title: string
  content: string
}

export const usePayrollStore = defineStore('payroll', () => {
  // State
  const currentMonth = ref('2025-08')
  const viewMode = ref<'summary' | 'detail'>('summary')
  const showComparison = ref(false)
  const drawerVisible = ref(false)
  const drawerType = ref('')
  const drawerData = ref<{ name: string; type: string } | null>(null)
  
  // Tree expansion state
  const expandedKeys = ref<string[]>(['0', '1', '2'])

  const months = ['2025-06', '2025-07', '2025-08']

  // Field Definitions
  const fieldDefinitions: Record<string, FieldDefinition> = {
    '发薪总人数': {
      title: '发薪总人数 (A1)',
      content: '范围：本月有实发工资记录（实发>0）且属于正式员工、试用员工。'
    },
    '涉及加班': {
      title: '涉及加班 (A2)',
      content: '条件：当月薪资明细中，[加班费] > 0 的人员。'
    },
    '涉及补偿金': {
      title: '涉及补偿金 (A3)',
      content: '条件：当月薪资明细中，[离职补偿金] > 0 的人员。'
    },
    '发薪总额': {
      title: '发薪总额 (B1)',
      content: '包含企业承担的所有直接人力成本。<br>公式：∑ (税前应发工资 + 五险一金司付)'
    },
    '应发工资': {
      title: '应发工资 (B2)',
      content: '① 本月应发工资（含加班费、奖金等）<br>② 倒挤计算：实发+扣款项。<br>公式：∑ (工资类 + 绩效 + 补贴)'
    },
    '加班费': {
      title: '加班费 (B3)',
      content: '当月发放加班费。<br>公式：∑ (加班费)'
    },
    '离职补偿': {
      title: '离职补偿 (B4)',
      content: '当月发放离职补偿金。<br>公式：∑ (离职补偿金)'
    },
    '签约金': {
      title: '签约金 (B5)',
      content: '当月发放签约金。<br>公式：∑ (签约金)'
    },
    '奖金': {
      title: '奖金 (B6)',
      content: '当月发放奖金。<br>公式：∑ (奖金类工资项)'
    },
    '五险一金司付': {
      title: '五险一金司付 (B7)',
      content: '仅包含法定福利的企业承担部分。<br>公式：∑ (养老+医疗+失业+工伤+生育) + ∑ (公积金)'
    },
    '发薪变化说明': {
      title: '发薪变化说明 (B9)',
      content: '逻辑：取自 Payroll 专员在后台针对该部门录入的备注信息，用于解释成本波动原因。'
    }
  }

  // Mock Data
  const datasets: Record<string, PayrollNode[]> = {
    '2025-06': [
      {
        id: '0', name: '完美世界', level: 0, expanded: true,
        desc: "集团总部",
        people: { val: 2674, chg: -10, pct: -0.4 },
        people_ot: { val: 85, chg: 0, pct: 0 },
        people_sev: { val: 23, chg: 0, pct: 0 },
        total: { val: 3921, chg: -19.88, pct: -0.5 },
        salary: { val: 2817.65, chg: -12.64, pct: -0.4 },
        ot_pay: { val: 162.82, chg: 3.29, pct: 2.1 },
        severance: { val: 65.25, chg: -2.1, pct: -3.1 },
        signing_bonus: { val: 0, chg: 0, pct: 0 },
        bonus: { val: 244, chg: 0, pct: 0 },
        social: { val: 580.52, chg: -7.4, pct: -1.3 },
        children: [
          {
            id: '1', name: '游戏业务', level: 1, expanded: true,
            desc: "业务平稳。",
            people: { val: 2510, chg: -7, pct: -0.3 },
            people_ot: { val: 78, chg: 0, pct: 0 },
            people_sev: { val: 23, chg: 0, pct: 0 },
            total: { val: 3687.45, chg: -15.58, pct: -0.4 },
            salary: { val: 2643.73, chg: -11.2, pct: -0.4 },
            ot_pay: { val: 155.36, chg: 3.29, pct: 2.1 },
            severance: { val: 65.25, chg: -2.1, pct: -3.0 },
            signing_bonus: { val: 0, chg: 0, pct: 0 },
            bonus: { val: 244.00, chg: 0, pct: 0 },
            social: { val: 528.34, chg: -5.4, pct: -1.0 },
            children: [
              {
                id: '1-1', name: '游戏工作室群', level: 2, expanded: false,
                desc: "原光子工作室群",
                people: { val: 1260, chg: 0, pct: 0 },
                people_ot: { val: 40, chg: 0, pct: 0 },
                people_sev: { val: 9, chg: 0, pct: 0 },
                total: { val: 1836.20, chg: -9.68, pct: -1.5 },
                salary: { val: 1382.13, chg: -9.68, pct: -2.0 },
                ot_pay: { val: 32.53, chg: 0, pct: 0 },
                severance: { val: 9.43, chg: 0, pct: 0 },
                signing_bonus: { val: 0, chg: 0, pct: 0 },
                bonus: { val: 172.30, chg: 0, pct: 0 },
                social: { val: 209.81, chg: 0, pct: 0 },
                children: []
              },
              {
                id: '1-2', name: '桃花源工作室群', level: 2, expanded: false,
                desc: "原天美工作室群",
                people: { val: 512, chg: 5, pct: 1.0 },
                people_ot: { val: 45, chg: 0, pct: 0 },
                people_sev: { val: 0, chg: 0, pct: 0 },
                total: { val: 712.50, chg: 12.3, pct: 1.8 },
                salary: { val: 550.00, chg: 10.0, pct: 1.9 },
                ot_pay: { val: 80.50, chg: 2.3, pct: 3.0 },
                severance: { val: 0, chg: 0, pct: 0 },
                signing_bonus: { val: 0, chg: 0, pct: 0 },
                bonus: { val: 10.00, chg: 0, pct: 0 },
                social: { val: 72.00, chg: 0, pct: 0 },
              }
            ]
          },
          {
            id: '2', name: '集团发展部', level: 1, expanded: true,
            desc: "原集团职能",
            people: { val: 164, chg: -3, pct: -1.8 },
            people_ot: { val: 7, chg: 0, pct: 0 },
            people_sev: { val: 0, chg: 0, pct: 0 },
            total: { val: 233.55, chg: -4.30, pct: -1.8 },
            salary: { val: 173.92, chg: -1.44, pct: -0.8 },
            ot_pay: { val: 7.46, chg: 0, pct: 0 },
            severance: { val: 0, chg: 0, pct: 0 },
            signing_bonus: { val: 0, chg: 0, pct: 0 },
            bonus: { val: 0, chg: 0, pct: 0 },
            social: { val: 52.18, chg: -2.0, pct: -3.8 },
            children: [
              {
                id: '2-1', name: '人力资源中台', level: 2, expanded: false,
                desc: "",
                people: { val: 30, chg: -1, pct: -3.2 },
                people_ot: { val: 0, chg: 0, pct: 0 },
                people_sev: { val: 0, chg: 0, pct: 0 },
                total: { val: 39.80, chg: -1.33, pct: -3.2 },
                salary: { val: 30.62, chg: -1.0, pct: -3.0 },
                ot_pay: { val: 0, chg: 0, pct: 0 },
                severance: { val: 0, chg: 0, pct: 0 },
                signing_bonus: { val: 0, chg: 0, pct: 0 },
                bonus: { val: 0, chg: 0, pct: 0 },
                social: { val: 9.19, chg: -0.3, pct: -3.0 },
              }
            ]
          }
        ]
      }
    ],
    '2025-07': [
      {
        id: '0', name: '完美世界', level: 0, expanded: true,
        desc: "集团总部",
        people: { val: 2762, chg: 88, pct: 3.3 },
        people_ot: { val: 90, chg: 5, pct: 5.9 },
        people_sev: { val: 5, chg: -18, pct: -78.3 },
        total: { val: 4080.3, chg: 159.3, pct: 4.1 },
        salary: { val: 2921.6, chg: 103.95, pct: 3.7 },
        ot_pay: { val: 176.7, chg: 13.88, pct: 8.5 },
        severance: { val: 15.2, chg: -50.05, pct: -76.7 },
        signing_bonus: { val: 50, chg: 50, pct: 0 },
        bonus: { val: 250, chg: 6, pct: 2.5 },
        social: { val: 602.2, chg: 21.68, pct: 3.7 },
        children: [
          {
            id: '1', name: '游戏业务', level: 1, expanded: true,
            desc: "",
            people: { val: 2600, chg: 90, pct: 3.6 },
            people_ot: { val: 85, chg: 7, pct: 9.0 },
            people_sev: { val: 5, chg: -18, pct: -78.3 },
            total: { val: 3850.20, chg: 162.75, pct: 4.4 },
            salary: { val: 2750.10, chg: 106.37, pct: 4.0 },
            ot_pay: { val: 170.50, chg: 15.14, pct: 9.7 },
            severance: { val: 15.20, chg: -50.05, pct: -76.7 },
            signing_bonus: { val: 50.00, chg: 50.00, pct: 100 },
            bonus: { val: 250.00, chg: 6.00, pct: 2.5 },
            social: { val: 550.40, chg: 22.06, pct: 4.2 },
            children: [
              {
                id: '1-1', name: '游戏工作室群', level: 2, expanded: false, desc: "",
                people: { val: 1280, chg: 20, pct: 1.6 }, people_ot: { val: 15, chg: -25, pct: -62 }, people_sev: { val: 2, chg: -7, pct: -77 }, total: { val: 1860.50, chg: 24.3, pct: 1.3 }, salary: { val: 1400.00, chg: 17.87, pct: 1.3 }, ot_pay: { val: 35.00, chg: 2.47, pct: 7.6 }, severance: { val: 5.00, chg: -4.43, pct: -47 }, signing_bonus: { val: 0, chg: 0, pct: 0 }, bonus: { val: 175.00, chg: 2.7, pct: 1.6 }, social: { val: 211.50, chg: 1.69, pct: 0.8 },
                children: []
              },
              {
                id: '1-2', name: '桃花源工作室群', level: 2, expanded: false, desc: "",
                people: { val: 530, chg: 18, pct: 3.5 }, people_ot: { val: 50, chg: 5, pct: 11 }, people_sev: { val: 0, chg: 0, pct: 0 }, total: { val: 740.20, chg: 27.7, pct: 3.9 }, salary: { val: 570.00, chg: 20.0, pct: 3.6 }, ot_pay: { val: 88.00, chg: 7.5, pct: 9.3 }, severance: { val: 0, chg: 0, pct: 0 }, signing_bonus: { val: 50.00, chg: 50, pct: 100 }, bonus: { val: 12.00, chg: 2, pct: 20 }, social: { val: 75.00, chg: 3, pct: 4.2 }
              }
            ]
          },
          {
            id: '2', name: '集团发展部', level: 1, expanded: true,
            desc: "",
            people: { val: 162, chg: -2, pct: -1.2 },
            people_ot: { val: 5, chg: -2, pct: -28 },
            people_sev: { val: 0, chg: 0, pct: 0 },
            total: { val: 230.10, chg: -3.45, pct: -1.5 },
            salary: { val: 171.50, chg: -2.42, pct: -1.4 },
            ot_pay: { val: 6.20, chg: -1.26, pct: -16.9 },
            severance: { val: 0, chg: 0, pct: 0 },
            signing_bonus: { val: 0, chg: 0, pct: 0 },
            bonus: { val: 0, chg: 0, pct: 0 },
            social: { val: 51.80, chg: -0.38, pct: -0.7 },
            children: [
              {
                id: '2-1', name: '人力资源中台', level: 2, expanded: false, desc: "",
                people: { val: 29, chg: -1, pct: -3.3 }, people_ot: { val: 0, chg: 0, pct: 0 }, people_sev: { val: 0, chg: 0, pct: 0 }, total: { val: 38.50, chg: -1.3, pct: -3.3 }, salary: { val: 29.80, chg: -0.82, pct: -2.7 }, ot_pay: { val: 0, chg: 0, pct: 0 }, severance: { val: 0, chg: 0, pct: 0 }, signing_bonus: { val: 0, chg: 0, pct: 0 }, bonus: { val: 0, chg: 0, pct: 0 }, social: { val: 8.70, chg: -0.49, pct: -5.3 }
              }
            ]
          }
        ]
      }
    ],
    '2025-08': [
      {
        id: '0', name: '完美世界', level: 0, expanded: true,
        desc: "集团总部",
        people: { val: 2935, chg: 173, pct: 6.3 },
        people_ot: { val: 70, chg: -20, pct: -22.2 },
        people_sev: { val: 5, chg: 0, pct: 0 },
        total: { val: 4786.3, chg: 706, pct: 17.3 },
        salary: { val: 3450, chg: 528.4, pct: 18.1 },
        ot_pay: { val: 140.5, chg: -36.2, pct: -20.5 },
        severance: { val: 18, chg: 2.8, pct: 18.4 },
        signing_bonus: { val: 12, chg: 0, pct: 0 },
        bonus: { val: 400, chg: 150, pct: 60 },
        social: { val: 680.3, chg: 78.1, pct: 13 },
        children: [
          {
            id: '1', name: '游戏业务', level: 1, expanded: true,
            desc: "普调生效，成本上升。",
            people: { val: 2755, chg: 155, pct: 6.0 },
            people_ot: { val: 65, chg: -20, pct: -23.5 },
            people_sev: { val: 5, chg: 0, pct: 0 },
            total: { val: 4520.50, chg: 670.3, pct: 17.4 },
            salary: { val: 3250.00, chg: 499.9, pct: 18.2 },
            ot_pay: { val: 135.00, chg: -35.5, pct: -20.8 },
            severance: { val: 18.00, chg: 2.8, pct: 18.4 },
            signing_bonus: { val: 12.00, chg: 0, pct: 0 },
            bonus: { val: 400.00, chg: 150.0, pct: 60.0 },
            social: { val: 620.00, chg: 69.6, pct: 12.6 },
            children: [
              {
                id: '1-1', name: '游戏工作室群', level: 2, expanded: true,
                desc: "下属工作室架构调整完成。",
                people: { val: 1680, chg: 400, pct: 31.3 },
                people_ot: { val: 30, chg: 15, pct: 100 },
                people_sev: { val: 3, chg: 1, pct: 50 },
                total: { val: 2580.00, chg: 719.5, pct: 38.7 },
                salary: { val: 1950.00, chg: 550.0, pct: 39.3 },
                ot_pay: { val: 45.00, chg: 10.0, pct: 28.6 },
                severance: { val: 12.00, chg: 7.0, pct: 140 },
                signing_bonus: { val: 12.00, chg: 0, pct: 0 },
                bonus: { val: 280.00, chg: 105.0, pct: 60 },
                social: { val: 380.00, chg: 168.5, pct: 79.7 },
                children: [
                  {
                    id: '1-1-1', name: '青云工作室', level: 3, expanded: false,
                    desc: "新项目立项",
                    people: { val: 600, chg: 20, pct: 3.4 },
                    people_ot: { val: 20, chg: 5, pct: 33 },
                    people_sev: { val: 0, chg: 0, pct: 0 },
                    total: { val: 950.00, chg: 45.3, pct: 5.0 },
                    salary: { val: 720.00, chg: 35.0, pct: 5.1 },
                    ot_pay: { val: 30.00, chg: 5.0, pct: 20 },
                    severance: { val: 0, chg: 0, pct: 0 },
                    signing_bonus: { val: 12.00, chg: 12, pct: 100 },
                    bonus: { val: 100.00, chg: 10, pct: 11 },
                    social: { val: 130.00, chg: 8, pct: 6.6 }
                  },
                  {
                    id: '1-1-2', name: '黑羽工作室', level: 3, expanded: false,
                    desc: "海外版本冲刺",
                    people: { val: 480, chg: 5, pct: 1.0 },
                    people_ot: { val: 8, chg: 2, pct: 33 },
                    people_sev: { val: 0, chg: 0, pct: 0 },
                    total: { val: 780.00, chg: 30.5, pct: 4.1 },
                    salary: { val: 560.00, chg: 25.0, pct: 4.7 },
                    ot_pay: { val: 12.00, chg: 3.0, pct: 33 },
                    severance: { val: 0, chg: 0, pct: 0 },
                    signing_bonus: { val: 0, chg: 0, pct: 0 },
                    bonus: { val: 80.00, chg: 15, pct: 23 },
                    social: { val: 105.00, chg: 5, pct: 5 }
                  },
                  {
                    id: '1-1-3', name: '白海豚工作室', level: 3, expanded: false,
                    desc: "人员优化完成",
                    people: { val: 600, chg: -30, pct: -4.8 },
                    people_ot: { val: 2, chg: -5, pct: -71 },
                    people_sev: { val: 3, chg: 3, pct: 100 },
                    total: { val: 850.00, chg: -20.5, pct: -2.4 },
                    salary: { val: 670.00, chg: -15.0, pct: -2.2 },
                    ot_pay: { val: 3.00, chg: -1.5, pct: -33 },
                    severance: { val: 12.00, chg: 12, pct: 100 },
                    signing_bonus: { val: 0, chg: 0, pct: 0 },
                    bonus: { val: 100.00, chg: 0, pct: 0 },
                    social: { val: 145.00, chg: -5, pct: -3.3 },
                  }
                ]
              },
              {
                id: '1-2', name: '桃花源工作室群', level: 2, expanded: false,
                desc: "",
                people: { val: 540, chg: 10, pct: 1.9 },
                people_ot: { val: 30, chg: -20, pct: -40 },
                people_sev: { val: 0, chg: 0, pct: 0 },
                total: { val: 820.50, chg: 80.3, pct: 10.8 },
                salary: { val: 630.00, chg: 60.0, pct: 10.5 },
                ot_pay: { val: 60.00, chg: 0, pct: 0 },
                severance: { val: 0, chg: 0, pct: 0 },
                signing_bonus: { val: 0, chg: 0, pct: 0 },
                bonus: { val: 18.00, chg: 6, pct: 50 },
                social: { val: 85.00, chg: 10, pct: 13.3 }
              }
            ]
          },
          {
            id: '2', name: '集团发展部', level: 1, expanded: true,
            desc: "架构升级，新设AI Lab",
            people: { val: 180, chg: 18, pct: 11.1 },
            people_ot: { val: 5, chg: 0, pct: 0 },
            people_sev: { val: 0, chg: 0, pct: 0 },
            total: { val: 265.80, chg: 35.7, pct: 15.5 },
            salary: { val: 200.00, chg: 28.5, pct: 16.6 },
            ot_pay: { val: 5.50, chg: -0.7, pct: -11.3 },
            severance: { val: 0, chg: 0, pct: 0 },
            signing_bonus: { val: 0, chg: 0, pct: 0 },
            bonus: { val: 0, chg: 0, pct: 0 },
            social: { val: 60.30, chg: 8.5, pct: 16.4 },
            children: [
              {
                id: '2-1', name: '人力资源中台', level: 2, expanded: false, desc: "",
                people: { val: 32, chg: 1, pct: 3.2 }, people_ot: { val: 0, chg: 0, pct: 0 }, people_sev: { val: 0, chg: 0, pct: 0 }, total: { val: 45.00, chg: 3.0, pct: 7.1 }, salary: { val: 35.00, chg: 2.0, pct: 6.1 }, ot_pay: { val: 0, chg: 0, pct: 0 }, severance: { val: 0, chg: 0, pct: 0 }, signing_bonus: { val: 0, chg: 0, pct: 0 }, bonus: { val: 0, chg: 0, pct: 0 }, social: { val: 10.00, chg: 1.3, pct: 14.9 }
              },
              {
                id: '2-2', name: 'AI Lab', level: 2, expanded: false,
                desc: "[NEW] 战略重点",
                people: { val: 15, chg: 15, pct: 100 },
                people_ot: { val: 2, chg: 2, pct: 100 },
                people_sev: { val: 0, chg: 0, pct: 0 },
                total: { val: 50.00, chg: 50, pct: 100 },
                salary: { val: 40.00, chg: 40, pct: 100 },
                ot_pay: { val: 2.00, chg: 2, pct: 100 },
                severance: { val: 0, chg: 0, pct: 0 },
                signing_bonus: { val: 0, chg: 0, pct: 0 },
                bonus: { val: 0, chg: 0, pct: 0 },
                social: { val: 8.00, chg: 8, pct: 100 }
              }
            ]
          }
        ]
      }
    ]
  }

  // Getters
  const currentData = computed(() => {
    return datasets[currentMonth.value] || []
  })

  const dashboardSummary = computed(() => {
    const data = currentData.value
    const summary = {
      people: { val: 0, chg: 0 },
      total: { val: 0, chg: 0 },
      ot_pay: { val: 0, chg: 0 },
      severance: { val: 0, chg: 0, people: 0 }
    }

    data.forEach(node => {
      summary.people.val += node.people.val
      summary.people.chg += node.people.chg
      
      summary.total.val += node.total.val
      summary.total.chg += node.total.chg

      summary.ot_pay.val += node.ot_pay.val
      summary.ot_pay.chg += node.ot_pay.chg

      summary.severance.val += node.severance.val
      summary.severance.chg += node.severance.chg
      
      summary.severance.people += node.people_sev.val
    })

    return summary
  })

  const allExpandableIds = computed(() => {
    const ids: string[] = []
    const traverse = (nodes: PayrollNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          ids.push(node.id)
          traverse(node.children)
        }
      })
    }
    traverse(currentData.value)
    return ids
  })

  const isAllExpanded = computed(() => {
    if (allExpandableIds.value.length === 0) return true
    return allExpandableIds.value.every(id => expandedKeys.value.includes(id))
  })

  const isAllCollapsed = computed(() => {
    // Assuming '0' is the root and it stays expanded, or empty
    // If we have only 1 key (root) or 0, it is collapsed
    return expandedKeys.value.length <= 1
  })

  // Actions
  function setMonth(month: string) {
    if (datasets[month]) {
      currentMonth.value = month
    }
  }

  function toggleMonth(delta: number) {
    const idx = months.indexOf(currentMonth.value)
    const newIdx = idx + delta
    if (newIdx >= 0 && newIdx < months.length) {
      currentMonth.value = months[newIdx]
    }
  }

  function setViewMode(mode: 'summary' | 'detail') {
    viewMode.value = mode
  }

  function toggleComparison() {
    showComparison.value = !showComparison.value
  }

  function openDrawer(type: string, name: string) {
    drawerType.value = type
    drawerData.value = { name, type }
    drawerVisible.value = true
  }

  function closeDrawer() {
    drawerVisible.value = false
    drawerData.value = null
  }
  
  function expandAll() {
    expandedKeys.value = [...allExpandableIds.value]
  }

  function collapseAll() {
    expandedKeys.value = ['0']
  }

  return {
    currentMonth,
    viewMode,
    showComparison,
    drawerVisible,
    drawerType,
    drawerData,
    fieldDefinitions,
    currentData,
    months,
    expandedKeys,
    setMonth,
    toggleMonth,
    setViewMode,
    toggleComparison,
    openDrawer,
    closeDrawer,
    dashboardSummary,
    expandAll,
    collapseAll,
    isAllExpanded,
    isAllCollapsed
  }
})
