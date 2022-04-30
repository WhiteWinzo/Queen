
FROM node:latest
RUN git clone https://github.com/DarkWinzo/Queen /root/Queen
WORKDIR /root/Queen/
ENV TZ=Europe/Istanbul
RUN yarn add supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
