const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Haz una pregunta a la bola mágica')
    .addStringOption(option =>
      option.setName('pregunta')
        .setDescription('Tu pregunta para la bola mágica')
        .setRequired(true)
    ),
  async execute(interaction) {
    const pregunta = interaction.options.getString('pregunta');
    
    // Respuestas posibles (puedes añadir más)
    const respuestas = [
      { texto: "🎱 Es cierto", color: 0x00FF00 },
      { texto: "🎱 Definitivamente sí", color: 0x00FF00 },
      { texto: "🎱 Sin duda", color: 0x00FF00 },
      { texto: "🎱 Sí - definitivamente", color: 0x00FF00 },
      { texto: "🎱 Puedes confiar en ello", color: 0x00FF00 },
      { texto: "🎱 Mi respuesta es no", color: 0xFF0000 },
      { texto: "🎱 Mis fuentes dicen que no", color: 0xFF0000 },
      { texto: "🎱 Muy dudoso", color: 0xFF0000 },
      { texto: "🎱 No cuentes con ello", color: 0xFF0000 },
      { texto: "🎱 Outlook no tan bueno", color: 0xFF0000 },
      { texto: "🎱 Mejor no decirte ahora", color: 0xFFA500 },
      { texto: "🎱 No puedo predecirlo ahora", color: 0xFFA500 },
      { texto: "🎱 Concéntrate y pregunta otra vez", color: 0xFFA500 },
      { texto: "🎱 Las señales apuntan a que sí", color: 0xADD8E6 },
      { texto: "🎱 Es decididamente así", color: 0xADD8E6 }
    ];

    // Seleccionar respuesta aleatoria
    const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

    // Crear embed
    const embed = new EmbedBuilder()
      .setTitle('🎱 Bola Mágica 8-Ball')
      .setDescription(`**Pregunta:** ${pregunta}`)
      .addFields(
        { name: 'Respuesta', value: respuesta.texto }
      )
      .setColor(respuesta.color)
      .setThumbnail('https://i.imgur.com/Lk2rlrZ.png') // Imagen de bola 8
      .setFooter({ 
        text: `Preguntado por ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL() 
      });

    await interaction.reply({ embeds: [embed] });
  }
};