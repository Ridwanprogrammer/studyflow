# Memory Devices

## Why computers use several kinds of memory

A processor needs data quickly, but the fastest storage is expensive and small. A hard drive stores much more data cheaply, but retrieving it is slower. Computer systems therefore use a **memory hierarchy**: small, fast storage near the processor and larger, slower storage farther away.

Registers hold values currently used by instructions. Cache keeps copies of recently or nearby-used memory blocks. Main memory (RAM) holds active programs and data. SSDs and hard drives retain files when power is off. Each level balances speed, capacity, cost, and persistence.

The hierarchy works because programs tend to reuse recently accessed data (**temporal locality**) and access locations near a recent location (**spatial locality**). A cache hit finds the data in cache; a miss requires fetching it from a slower level.

## SRAM, DRAM, and ROM solve different storage problems

**SRAM** stores each bit using a latch-like transistor circuit. It is fast and does not need refresh while powered, but each cell uses more transistors and takes more chip area. SRAM commonly forms CPU caches.

**DRAM** stores each bit as charge in a capacitor controlled by a transistor. The charge leaks, so the memory must periodically refresh its rows. DRAM cells are compact and provide high capacity at lower cost, making DRAM suitable for main memory. Reading a DRAM row senses and restores charge internally; at the system interface, reads do not normally appear to erase data.

Both SRAM and DRAM are **volatile**: their contents are lost when power is removed.

**ROM** and flash memory are non-volatile. Mask ROM is programmed during manufacture; PROM can be programmed once; EPROM can be erased with ultraviolet light; EEPROM can be erased electrically; flash erases larger blocks electrically. NOR flash supports fast random reads useful for executing code, while NAND flash packs data densely and is common in SSDs and memory cards.

## Addresses select stored words

An address identifies a location. With $n$ address lines, there are $2^n$ possible addresses. With $m$ data lines, each addressed word contains $m$ bits.

A memory labelled `16K × 8` stores 16K words, 8 bits per word. If K means 1024, it contains 16,384 bytes, or 16 KiB. Distinguish bits (`b`) from bytes (`B`); one byte is 8 bits.

An address decoder activates the selected word. Control signals such as chip select (CS), output enable (OE), and write enable (WE) determine whether a chip responds, drives data, or stores incoming data. Adding chips can increase the number of words, the word width, or both.

## Cache reduces average access time

Cache stores copies of memory blocks likely to be used again. The **hit rate** $h$ is the fraction of accesses found in cache. If cache access time is $t_c$ and memory access time is $t_m$, a simplified average access time is

$$t_{avg}=h\,t_c+(1-h)t_m.$$

For $t_c=1$ ns, $t_m=100$ ns, and $h=0.95$,

$$t_{avg}=0.95(1)+0.05(100)=5.95\text{ ns}.$$

A high hit rate can make the average much closer to cache speed, even though misses are expensive.

### Mapping and replacement

Direct mapping sends each memory block to exactly one cache line. It is simple but can produce conflicts when frequently used blocks compete for the same line. Fully associative mapping allows a block in any line, reducing such conflicts but requiring more tag comparisons. Set-associative mapping places a block in one set and allows a choice among several lines there.

An address is divided into **tag**, **index/set**, and **offset** fields. The index selects a line or set; the tag checks which block is stored; the offset selects a byte within the block.

When a set is full, a replacement policy chooses what to remove. LRU approximates “least recently used”; FIFO removes the oldest arrival; random selects a line arbitrarily. Each makes different cost and performance trade-offs.

Write-through updates cache and main memory on each write; write-back updates cache first and writes the modified block later, tracking it with a dirty bit. Write buffers can reduce the wait associated with writing through.

## Virtual memory gives each process an address space

Programs use **virtual addresses**, which the operating system and hardware translate to physical memory. Paging divides virtual memory into fixed-size pages and physical memory into equal-size frames. A page table maps virtual page numbers to physical frame numbers; the offset within the page remains unchanged.

A **translation lookaside buffer (TLB)** caches recent page-table entries. A TLB hit avoids a slower page-table lookup. If a valid page is not currently in physical memory, a **page fault** lets the operating system locate it in storage, load it into a frame, update the mapping, and restart the interrupted instruction. This enables programs to use an address space larger than available RAM, but storage access is much slower than memory.

## Reliability and physical organization

A parity bit can detect any odd number of bit errors in a protected word, including one-bit errors, but cannot locate or correct them. Hamming codes add parity bits at power-of-two positions. For $m$ data bits and $r$ check bits, choose $r$ so that

$$2^r\ge m+r+1.$$

The syndrome identifies a single-bit error position. Extended Hamming code can correct one error and detect two (SECDED).

Memory chips are packaged as integrated circuits or modules such as DIMMs. Packaging affects how chips connect to the system; it does not change the logical roles of address, data, and control signals.

## Practice

1. A memory has 12 address lines and 8 data lines. How many locations and bits per word?
2. With cache time 10 ns, memory time 100 ns, and average time 20 ns, find the hit rate.
3. Why is DRAM refreshed while SRAM is not?

**Check:** 1. $2^{12}=4096$ locations, 8 bits per word. 2. $20=10h+100(1-h)$, so $h=8/9\approx88.9\%$. 3. DRAM stores leaking capacitor charge; SRAM stores state in a powered transistor circuit.
