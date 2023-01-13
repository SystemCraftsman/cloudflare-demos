export interface ScheduledObject {
    name: string
    id: number
    triggerEverySeconds?: number
  }
 
export class GameObject {
  id: string|DurableObjectId
  storage: DurableObjectStorage
 
  constructor(state:DurableObjectState) {
    this.storage = state.storage
    this.id = state.id
  }
 
    async fetch(request:Request) {
        const scheduledObject:ScheduledObject = await request.json()

        const time:number = Date.now()
        scheduledObject.id = time

        this.storage.put(scheduledObject.name, scheduledObject)
        this.storage.setAlarm(time)
        return new Response(JSON.stringify({
        id: this.id.toString()
        }), {
        headers: {
            "content-type": "application/json"
        }
        })
    }
 
  async alarm() {
    const scheduledObjectMap:Map<string, ScheduledObject>|undefined = await this.storage.list()

    scheduledObjectMap.forEach((scheduledObject: ScheduledObject) => {
        if (scheduledObject) {
            console.log(scheduledObject.name +" with ID "+scheduledObject.id+" is spawned at "+ new Date(scheduledObject.id).toISOString())
       
            if (scheduledObject.triggerEverySeconds) {
                  this.scheduleSpawn(scheduledObject);
                  this.storage.put(scheduledObject.name, scheduledObject)
              } else {
                  this.storage.deleteAll();
              }
          }
    });
 
  }

  scheduleSpawn(scheduledObject: ScheduledObject) {
    let scheduledTime: number = Date.now();

    if (scheduledObject.triggerEverySeconds) {
        scheduledTime += scheduledObject.triggerEverySeconds * 1000;
    }

    scheduledObject.id = scheduledTime

    this.storage.setAlarm(scheduledTime);
}
}