const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Lanza una moneda virtual')
    .addStringOption(option =>
      option.setName('apuesta')
        .setDescription('¿Cara o cruz? (opcional)')
        .setRequired(false)
        .addChoices(
          { name: '🟡 Cara', value: 'cara' },
          { name: '⚫ Cruz', value: 'cruz' }
        )
    ),
  async execute(interaction) {
    // Generar resultado aleatorio
    const resultado = Math.random() < 0.5 ? 'cara' : 'cruz';
    const apuestaUsuario = interaction.options.getString('apuesta');
    
    // Crear embed
    const embed = new EmbedBuilder()
      .setTitle('🎲 Lanzamiento de Moneda')
      .setThumbnail(resultado === 'cara' ? 
        'https://i.imgur.com/Jr5J6ym.png' : 
        'https://i.imgur.com/9X6JtZx.png')
      .setColor('#F8C300')
      .addFields(
        { name: 'Resultado', value: resultado === 'cara' ? '🟡 Cara' : '⚫ Cruz', inline: true }
      );

    // Lógica de apuesta
    if (apuestaUsuario) {
      const gano = apuestaUsuario === resultado;
      embed.addFields(
        { name: 'Tu apuesta', value: apuestaUsuario === 'cara' ? '🟡 Cara' : '⚫ Cruz', inline: true },
        { name: 'Resultado', value: gano ? '🎉 ¡Ganaste!' : '💀 ¡Perdiste!', inline: false }
      );
    }

    // Responder
    await interaction.reply({ embeds: [embed] });
  }
};