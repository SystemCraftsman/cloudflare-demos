export class Avatar {
    constructor(state) {
        this.state = state;
        this.id = state.id
        this.name = ''
        this.clanId = 0
    }

    getAll() {
        return {
            "id": this.id,
            "name": this.name,
            "clanId": this.clanId
        }
    }

    setAll(data) {
        this.setName(data)
        this.setClanId(data)
    }

    setName(data) {
        this.name = data.name
    }

    setClanId(data) {
        this.clanId = Number(data.clanId)
    }

    async fetch(request) {
        let value = await this.state.storage.get("value") || 0

        let data

        switch (request.method) {
            case "GET":
                value = this.getAll()
                break;
            case "POST":
                data = await request.json?.()
                this.setAll(data)
                value = this.getAll()

                await this.state.storage.put("value", value)
                break;
            default:
                return new Response("Not found", { status: 404 });
        }
        return new Response(JSON.stringify(value))
    }
  }