import { PrismaClient, Faction, Race, CharacterClass } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create test user with character
    const user = await prisma.user.upsert({
        where: { email: 'hero@azeroth.com' },
        update: {},
        create: {
            email: 'hero@azeroth.com',
            password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', // "password123"
            character: {
                create: {
                    name: 'Thrall',
                    faction: Faction.HORDE,
                    race: Race.ORC,
                    class: CharacterClass.SHAMAN,
                    xpTotal: 0,
                    level: 1,
                    gold: 100,
                },
            },
        },
        include: { character: true },
    });

    console.log(`✅ Created user: ${user.email}`);
    console.log(`✅ Created character: ${user.character?.name}`);

    // Create sample campaign with quest chain
    if (user.character) {
        const campaign = await prisma.campaign.create({
            data: {
                title: 'Learn TypeScript',
                description: 'Master TypeScript to become a better developer',
                characterId: user.character.id,
                questChains: {
                    create: {
                        title: 'Chapter 1: Basics',
                        order: 0,
                        quests: {
                            create: [
                                {
                                    title: 'Setup Development Environment',
                                    objective: 'Install Node.js and configure TypeScript',
                                    order: 0,
                                    estimatedMinutes: 15,
                                    xpReward: 50,
                                    steps: {
                                        create: [
                                            { text: 'Install Node.js LTS', order: 0 },
                                            { text: 'Run npm init in new folder', order: 1 },
                                            { text: 'Install TypeScript globally', order: 2 },
                                        ],
                                    },
                                },
                                {
                                    title: 'First TypeScript File',
                                    objective: 'Create and compile your first .ts file',
                                    order: 1,
                                    estimatedMinutes: 10,
                                    xpReward: 75,
                                    isMilestone: true,
                                    goldReward: 25,
                                    steps: {
                                        create: [
                                            { text: 'Create hello.ts file', order: 0 },
                                            { text: 'Add console.log with typed variable', order: 1 },
                                            { text: 'Compile with tsc', order: 2 },
                                            { text: 'Run the output', order: 3 },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        });

        console.log(`✅ Created campaign: ${campaign.title}`);

        // Create sample wish item
        const wish = await prisma.wishItem.create({
            data: {
                title: 'New Mechanical Keyboard',
                description: 'Cherry MX Brown switches',
                costGold: 500,
                characterId: user.character.id,
            },
        });

        console.log(`✅ Created wish: ${wish.title}`);
    }

    console.log('🎉 Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
