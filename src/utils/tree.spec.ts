import * as tree from './tree';
import { OrderDirection } from '../store/tree/types';

const treeData = {
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
                        {
                            fullName: 'Janvier Inara In',
                            email: 'janvier.inara.in@example.com',
                        },
                        {
                            fullName: 'Janvier Inara InI',
                            email: 'janvier.inara.ini@example.com',
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

describe('Tree', () => {
    it('getTreeNodes: Should get all tree nodes recursively', () => {
        expect(tree.getTreeNodes(treeData)).toStrictEqual([
            {
                label: 'Penelope Randi',
                value: 'Penelope Randi',
            },
            {
                label: 'Andre Martina',
                value: 'Andre Martina',
            },
            {
                label: 'Barakat Yehud',
                value: 'Barakat Yehud',
            },
            {
                label: 'Janvier Inara',
                value: 'Janvier Inara',
            },
            {
                label: 'Janvier Inara In',
                value: 'Janvier Inara In',
            },
            {
                label: 'Janvier Inara InI',
                value: 'Janvier Inara InI',
            },
            {
                label: 'Reiner Pollux',
                value: 'Reiner Pollux',
            },
        ]);
    });

    it('isTreeFull: Should check if tree is full', () => {
        expect(tree.isTreeFull(treeData)).toBeFalsy();
        expect(
            tree.isTreeFull({
                ...treeData,
                subNodes: [
                    ...treeData.subNodes,
                    ...Array(2000).fill({
                        fullName: 'Test',
                        email: 'test@example.com',
                    }),
                ],
            }),
        ).toBeTruthy();
    });

    it('getTreeDataWithInsertedNode: Should return tree data with inserted node', () => {
        expect(
            tree.getTreeDataWithInsertedNode(treeData, {
                fullName: 'Test Test',
                email: 'test.test@example.com',
                coach: 'Penelope Randi',
            }),
        ).toStrictEqual({
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
                                {
                                    fullName: 'Janvier Inara In',
                                    email: 'janvier.inara.in@example.com',
                                },
                                {
                                    fullName: 'Janvier Inara InI',
                                    email: 'janvier.inara.ini@example.com',
                                },
                            ],
                        },
                    ],
                },
                {
                    fullName: 'Reiner Pollux',
                    email: 'reiner.pollux@example.com',
                },
                {
                    fullName: 'Test Test',
                    email: 'test.test@example.com',
                },
            ],
        });

        expect(
            tree.getTreeDataWithInsertedNode(treeData, {
                fullName: 'Test Test',
                email: 'test.test@example.com',
                coach: 'Barakat Yehud',
            }),
        ).toStrictEqual({
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
                                {
                                    fullName: 'Janvier Inara In',
                                    email: 'janvier.inara.in@example.com',
                                },
                                {
                                    fullName: 'Janvier Inara InI',
                                    email: 'janvier.inara.ini@example.com',
                                },
                                {
                                    fullName: 'Test Test',
                                    email: 'test.test@example.com',
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
        });
    });

    it('getTreeDataWithDeletedParent: Should return tree data with deleted parent or false if parent is not found', () => {
        expect(tree.getTreeDataWithDeletedParent(treeData, 'Penelope Randi')).toStrictEqual({
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
                        {
                            fullName: 'Janvier Inara In',
                            email: 'janvier.inara.in@example.com',
                        },
                        {
                            fullName: 'Janvier Inara InI',
                            email: 'janvier.inara.ini@example.com',
                        },
                    ],
                },
                {
                    fullName: 'Reiner Pollux',
                    email: 'reiner.pollux@example.com',
                },
            ],
        });

        expect(
            tree.getTreeDataWithDeletedParent(
                {
                    fullName: 'Andre Martina',
                    email: 'andre.martina@example.com',
                    subNodes: [],
                },
                'Andre Martina',
            ),
        ).toEqual(null);

        expect(tree.getTreeDataWithDeletedParent(treeData, 'Andre Martina')).toEqual(false);
    });

    it('getTreeDataWithDeletedNode: Should return tree data with inner tree node deleted', () => {
        expect(tree.getTreeDataWithDeletedNode(treeData.subNodes, 'Janvier Inara')).toStrictEqual([
            {
                fullName: 'Andre Martina',
                email: 'andre.martina@example.com',
                subNodes: [
                    {
                        fullName: 'Barakat Yehud',
                        email: 'barakat.yehud@example.com',
                        subNodes: [
                            {
                                fullName: 'Janvier Inara In',
                                email: 'janvier.inara.in@example.com',
                            },
                            {
                                fullName: 'Janvier Inara InI',
                                email: 'janvier.inara.ini@example.com',
                            },
                        ],
                    },
                ],
            },
            {
                fullName: 'Reiner Pollux',
                email: 'reiner.pollux@example.com',
            },
        ]);

        expect(tree.getTreeDataWithDeletedNode(treeData.subNodes, 'Barakat Yehud')).toStrictEqual([
            {
                fullName: 'Andre Martina',
                email: 'andre.martina@example.com',
                subNodes: [
                    {
                        fullName: 'Janvier Inara',
                        email: 'janvier.inara@example.com',
                    },
                    {
                        fullName: 'Janvier Inara In',
                        email: 'janvier.inara.in@example.com',
                    },
                    {
                        fullName: 'Janvier Inara InI',
                        email: 'janvier.inara.ini@example.com',
                    },
                ],
            },
            {
                fullName: 'Reiner Pollux',
                email: 'reiner.pollux@example.com',
            },
        ]);
    });

    it('getOrderedTreeData: Should return tree data that is ordered', () => {
        expect(
            tree.getOrderedTreeData(treeData.subNodes, 'Reiner Pollux', OrderDirection.Up),
        ).toStrictEqual([
            {
                fullName: 'Reiner Pollux',
                email: 'reiner.pollux@example.com',
            },
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
                            {
                                fullName: 'Janvier Inara In',
                                email: 'janvier.inara.in@example.com',
                            },
                            {
                                fullName: 'Janvier Inara InI',
                                email: 'janvier.inara.ini@example.com',
                            },
                        ],
                    },
                ],
            },
        ]);

        expect(
            tree.getOrderedTreeData(treeData.subNodes, 'Janvier Inara', OrderDirection.Down),
        ).toStrictEqual([
            {
                fullName: 'Andre Martina',
                email: 'andre.martina@example.com',
                subNodes: [
                    {
                        fullName: 'Barakat Yehud',
                        email: 'barakat.yehud@example.com',
                        subNodes: [
                            {
                                fullName: 'Janvier Inara In',
                                email: 'janvier.inara.in@example.com',
                            },
                            {
                                fullName: 'Janvier Inara',
                                email: 'janvier.inara@example.com',
                            },
                            {
                                fullName: 'Janvier Inara InI',
                                email: 'janvier.inara.ini@example.com',
                            },
                        ],
                    },
                ],
            },
            {
                fullName: 'Reiner Pollux',
                email: 'reiner.pollux@example.com',
            },
        ]);

        expect(
            tree.getOrderedTreeData(treeData.subNodes, 'Janvier Inara In', OrderDirection.Down),
        ).toStrictEqual([
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
                            {
                                fullName: 'Janvier Inara InI',
                                email: 'janvier.inara.ini@example.com',
                            },
                            {
                                fullName: 'Janvier Inara In',
                                email: 'janvier.inara.in@example.com',
                            },
                        ],
                    },
                ],
            },
            {
                fullName: 'Reiner Pollux',
                email: 'reiner.pollux@example.com',
            },
        ]);

        expect(
            tree.getOrderedTreeData(treeData.subNodes, 'Janvier Inara In', OrderDirection.Up),
        ).toStrictEqual([
            {
                fullName: 'Andre Martina',
                email: 'andre.martina@example.com',
                subNodes: [
                    {
                        fullName: 'Barakat Yehud',
                        email: 'barakat.yehud@example.com',
                        subNodes: [
                            {
                                fullName: 'Janvier Inara In',
                                email: 'janvier.inara.in@example.com',
                            },
                            {
                                fullName: 'Janvier Inara',
                                email: 'janvier.inara@example.com',
                            },
                            {
                                fullName: 'Janvier Inara InI',
                                email: 'janvier.inara.ini@example.com',
                            },
                        ],
                    },
                ],
            },
            {
                fullName: 'Reiner Pollux',
                email: 'reiner.pollux@example.com',
            },
        ]);
    });
});
