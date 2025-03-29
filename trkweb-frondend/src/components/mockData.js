// Mock Users
export const mockUsers = [
    {
        id: 1,
        email: 'john.doe@example.com',
        fname: 'John',
        lname: 'Doe',
        department: 'Engineering',
        role: 'Admin',
        status: 'Active'
    },
    {
        id: 2,
        email: 'jane.smith@example.com',
        fname: 'Jane',
        lname: 'Smith',
        department: 'Finance',
        role: 'Member',
        status: 'Inactive'
    },
    {
        id: 3,
        email: 'max.ivanko@example.com',
        fname: 'Max',
        lname: 'Ivanko',
        department: 'IT',
        role: 'Member',
        status: 'Active'
    },
    {
        id: 4,
        email: 'lisa.chan@example.com',
        fname: 'Lisa',
        lname: 'Chan',
        department: 'Marketing',
        role: 'Admin',
        status: 'Active'
    }
];

// Mock Applications
export const mockApps = [
    {
        id: 1,
        name: 'Slack',
        category: 'Communication',
        status: 'Active',
        renewal_date: '2025-05-12',
        owner: 'John Doe',
        notes: 'Used company-wide'
    },
    {
        id: 2,
        name: 'Figma',
        category: 'Design',
        status: 'Needs review',
        renewal_date: '2025-04-03',
        owner: 'Jane Smith',
        notes: 'UX team primary tool'
    },
    {
        id: 3,
        name: 'Jira',
        category: 'Project Management',
        status: 'On hold',
        renewal_date: '2025-06-01',
        owner: 'Max Ivanko',
        notes: 'Might switch to Linear'
    },
    {
        id: 4,
        name: 'Notion',
        category: 'Knowledge Base',
        status: 'Canceled',
        renewal_date: '2024-12-31',
        owner: 'Lisa Chan',
        notes: 'Was replaced with Confluence'
    }
];

// Existing mockUsers and mockApps...

export const mockPricingPlans = [
    {
        id: 1,
        app_id: 1,
        name: 'Standard',
        num_of_licences: 10,
        price_per_licence: 12,
        billing_cycle: 'Monthly'
    },
    {
        id: 2,
        app_id: 2,
        name: 'Pro',
        num_of_licences: 25,
        price_per_licence: 20,
        billing_cycle: 'Yearly'
    }
];


export const mockTransactions = [
    {
        id: 1,
        number: 'TX-1001',
        app_id: 1,
        description: 'Monthly invoice for Slack',
        datetime: '2025-03-01T10:15:00',
        status: 'Completed',
        amount: 120
    },
    {
        id: 2,
        number: 'TX-1002',
        app_id: 2,
        description: 'Annual plan for Figma',
        datetime: '2025-03-05T08:45:00',
        status: 'Pending',
        amount: 500
    }
];
