const NAME = 'TREE';
export const SET_NODE = `${NAME}_SET_NODE`;

export const INITIAL_STATE = {
    fullName: 'Penelope Randi',
    email: 'penelope.randi@example.com',
    subNodes: [
        {
            fullName: 'Andre Martina',
            email: 'andre.martina@example.com',
            subNodes: [
                {
                    fullName: 'Barakat Yehud',
                    email: 'barakat.yehud@example.com',
                    subNodes: [
                        {
                            fullName: 'Janvier Inara',
                            email: 'janvier.inara@example.com',
                        },
                    ],
                },
            ],
        },
        {
            fullName: 'Reiner Pollux',
            email: 'reiner.pollux@example.com',
        },
    ],
};
