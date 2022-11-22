import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const monteiro = await prisma.author.create({
        data: {
            name: 'Alberto Monteiro',
            books: {
                createMany: {
                    data: [
                        {
                            title: 'Um conto muito louco',
                            sinopsis: 'Uma história pra lá de louca'
                        },
                        {
                            title: 'Contando contos contantes'
                        },
                        {
                            title: 'Sem criatividade não há o que fazer',
                            sinopsis: 'Desvendando o inesvendável'
                        }
                    ]
                }
            }
        }
    })

    const lobato = await prisma.author.create({
        data: {
            name: 'Lobato de Queiroz',
            books: {
                createMany: {
                    data: [
                        {
                            title: 'Nunca julgue uma capa por um livro',
                            sinopsis: 'Julgastes?'
                        },
                        {
                            title: 'Deu a louca no autor'
                        },
                        {
                            title: 'Viver em sociedade, estudando a sociologia',
                            sinopsis: 'Pensamentos profundos para mentes rasas'
                        }
                    ]
                }
            }
        }
    })
    console.log({ monteiro, lobato });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
})