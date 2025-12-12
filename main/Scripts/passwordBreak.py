from random import randint
from multiprocessing import Process, Event, Value, cpu_count

def worker(start, end, target, found_event, result):
    for i in range(start, end):
        if found_event.is_set():
            return
        if i == target:
            result.value = i
            found_event.set()
            return

if __name__ == '__main__':
    target = randint(0, 100_000)
    print("\n\n\nPassword (test):", target)

    nproc = cpu_count()
    total = 100_001
    chunk = (total + nproc - 1) // nproc

    found_event = Event()
    result = Value('i', -1)
    procs = []
    for p in range(nproc):
        s = p * chunk
        e = min(total, s + chunk)
        proc = Process(target=worker, args=(s, e, target, found_event, result))
        proc.start()
        procs.append(proc)

    for proc in procs:
        proc.join()

    if result.value != -1:
        print("Found:", result.value)
    else:
        print("Not found")
