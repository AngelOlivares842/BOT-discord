const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Juega piedra, papel o tijera contra el bot')
    .addStringOption(option =>
      option.setName('opcion')
        .setDescription('Elige tu jugada')
        .setRequired(true)
        .addChoices(
          { name: 'Piedra 🪨', value: 'piedra' },
          { name: 'Papel 📄', value: 'papel' },
          { name: 'Tijera ✂️', value: 'tijera' }
        )
    ),
  async execute(interaction) {
    const userChoice = interaction.options.getString('opcion');
    const botChoice = ['piedra', 'papel', 'tijera'][Math.floor(Math.random() * 3)];
    
    // Determinar resultado
    let result;
    if (userChoice === botChoice) {
      result = '¡Empate! 🤝';
    } else if (
      (userChoice === 'piedra' && botChoice === 'tijera') ||
      (userChoice === 'papel' && botChoice === 'piedra') ||
      (userChoice === 'tijera' && botChoice === 'papel')
    ) {
      result = '¡Ganaste! 🎉';
    } else {
      result = '¡Perdiste! 💀';
    }

    // Emojis para las elecciones
    const emojis = {
      piedra: '🪨',
      papel: '📄',
      tijera: '✂️'
    };

    // Crear embed
    const embed = new EmbedBuilder()
      .setTitle('🎮 Piedra, Papel o Tijera')
      .setColor('#FF0000')
      .addFields(
        { name: 'Tu elección', value: `${emojis[userChoice]} ${userChoice}`, inline: true },
        { name: 'Elección del bot', value: `${emojis[botChoice]} ${botChoice}`, inline: true },
        { name: 'Resultado', value: result, inline: false }
      )
      .setThumbnail('https://i.imgur.com/3ZQj3yE.png') // Puedes cambiar esta imagen
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};