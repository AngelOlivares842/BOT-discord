const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { canalconfesiones, canalmods } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('confesar')
    .setDescription('Envía una confesión anónima 💌')
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('Escribe tu secreto aquí...')
        .setRequired(true)
        .setMaxLength(1000)
    ),
  async execute(interaction) {
    // Verificar canal permitido
    if (interaction.channelId !== canalconfesiones) {
      return interaction.reply({
        content: `❌ Este comando solo puede usarse en el canal de confesiones.`,
        ephemeral: true
      });
    }

    const { user, channel, options } = interaction;
    const confesion = options.getString('mensaje');

    // 1. Embed Público (anónimo)
    const embedPublico = new EmbedBuilder()
      .setTitle('💌 Nueva Confesión Anónima')
      .setDescription(confesion)
      .setColor('#FFACCB')
      .setFooter({ text: 'Usa /confesar para enviar las tuyas' });

    // 2. Enviar confesión
    await interaction.reply({ content: '✅ Confesión enviada anónimamente', ephemeral: true });
    const mensajeConfesion = await channel.send({ embeds: [embedPublico] });

    // 3. Registro para moderadores
    const canalMods = interaction.guild.channels.cache.get(canalmods);
    if (canalMods) {
      const embedMods = new EmbedBuilder()
        .setTitle('🔍 Registro de Confesión')
        .setDescription(`**Contenido:** ${confesion}`)
        .addFields(
          { name: 'Autor', value: `${user.tag} (\`${user.id}\`)`, inline: true },
          { name: 'Canal', value: `${channel}`, inline: true },
          { name: 'ID Mensaje', value: `\`${mensajeConfesion.id}\``, inline: true }
        )
        .setColor('#7289DA')
        .setTimestamp();

      await canalMods.send({ 
        content: '📌 **Nueva confesión registrada**',
        embeds: [embedMods] 
      });
    }
  }
};