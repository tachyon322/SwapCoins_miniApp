import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart, Command
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

TOKEN = "8255966758:AAHd0QBwntX-KVz0h704cy1YDYVcqtjis8I"
WEBAPP_URL = "http://localhost:5000"

dp = Dispatcher()


def get_keyboard(username: str):
    url = f"{WEBAPP_URL}/?user={username}"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text='Открыть WebApp',
                    web_app=WebAppInfo(url=url)
                )
            ]
        ]
    )


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer("Привет! Напиши /webapp чтобы открыть веб-приложение.")


@dp.message(Command('webapp'))
async def command_webapp_handler(message: Message) -> None:
    username = message.from_user.username or f"id{message.from_user.id}"
    await message.answer(f"Открываем WebApp для {username}...", reply_markup=get_keyboard(username))


@dp.message()
async def echo_handler(message: Message) -> None:
    try:
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        await message.answer("Неподдерживаемый тип сообщения.")


async def main() -> None:
    bot = Bot(token=TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
