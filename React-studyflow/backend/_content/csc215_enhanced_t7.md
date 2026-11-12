# CSC 215 Topic 7: Memory Devices — Enhanced

## The Central Idea

**Memory hierarchy** balances speed, capacity, cost, and persistence. From registers (fastest, smallest) to secondary storage (slowest, largest), each level serves a specific role.

This topic covers memory technologies, organization, and the trade-offs that define modern computer architecture.

---

## Why It Matters — Past Exam Coverage

| Past Exam Question | This Topic Covers |
|--------------------|-------------------|
| Memory hierarchy explanation | Registers, cache, RAM, ROM, secondary |
| RAM vs ROM | Volatile vs non-volatile |
| Cache memory | Mapping, hits/misses |
| Virtual memory | Paging, page tables, TLB |
| Memory address decoding | Chip select, address lines |

---

## Section 1 — Memory Hierarchy

```
┌─────────────────────┐
│   CPU Registers     │  <1ns, bytes, $$$/bit, volatile
├─────────────────────┤
│   L1 Cache (SRAM)   │  ~1ns, KB, $$/bit, volatile
├─────────────────────┤
│   L2/L3 Cache       │  ~5-20ns, MB, $/bit, volatile
├─────────────────────┤
│   Main Memory (DRAM)│  ~50-100ns, GB, ¢/bit, volatile
├─────────────────────┤
│   Flash/SSD         │  ~50-100μs, TB, ¢/bit, non-volatile
├─────────────────────┤
│   HDD               │  ~5-10ms, TB, $/GB, non-volatile
└─────────────────────┘
```

**Key Principle:** Locality of reference (temporal + spatial) makes hierarchy effective.

---

## Section 2 — Semiconductor Memory Technologies

### SRAM (Static RAM)

- **Cell:** 6 transistors (cross-coupled inverters + access transistors)
- **Speed:** Fastest (~1ns)
- **Density:** Low (large cell)
- **Power:** Low standby, higher active
- **Volatile:** Yes
- **Use:** Cache, registers

**6T SRAM Cell:**
```
        WL
         │
    ┌────┴────┐
    │         │
   BL       BL'
    │         │
  ┌─┴─┐     ┌─┴─┐
  │ M1│     │ M2│  (access transistors)
  └─┬─┘     └─┬─┘
    │         │
  ┌─┴─────────┴─┐
  │  Cross-coupled inverters  │
  │  (4 transistors: M3-M6)   │
  └─────────────┘
```

### DRAM (Dynamic RAM)

- **Cell:** 1 transistor + 1 capacitor (1T1C)
- **Speed:** Slower (~50ns)
- **Density:** High (small cell)
- **Power:** Refresh power needed
- **Volatile:** Yes
- **Refresh:** Every 64ms (capacitor leaks)
- **Use:** Main memory

**1T1C DRAM Cell:**
```
    WL
     │
    ┌─┴─┐
    │ M │  (access transistor)
    └─┬─┘
      │
    ┌─┴─┐
    │ C │  (capacitor)
    └───┘
```

**DRAM Operations:**
- **Read:** Activate row (RAS), sense amplifiers amplify bitline voltage, read column (CAS). **Destructive read** — must rewrite.
- **Write:** Activate row, drive bitlines, store charge.
- **Refresh:** Read each row periodically to restore charge.

**DRAM Timing:**
- t_RCD: RAS to CAS delay
- t_CAS: CAS access time
- t_RP: RAS precharge
- t_RC: Cycle time (RAS to next RAS)

---

### ROM (Read-Only Memory)

| Type | Programmable? | Erasable? | Use |
|------|---------------|-----------|-----|
| **Mask ROM** | Factory | No | High-volume firmware |
| **PROM** | Once (fuses) | No | Low-volume firmware |
| **EPROM** | Yes | UV light (20min) | Development |
| **EEPROM** | Yes | Electrically (byte) | Config data |
| **Flash** | Yes | Electrically (block) | SSD, BIOS, USB |

**Flash Types:**
- **NOR Flash:** Random access, execute-in-place (code)
- **NAND Flash:** Block access, high density (data storage)

---

## Section 3 — Memory Organization

### Address Space

**n address lines → 2ⁿ addressable locations**
**m data lines → m-bit word width**

**Example:** 16-bit address, 8-bit data → 64KB memory

### Words, Capacity, and Basic Memory Operations

A memory labelled `16K × 8` has 16K addressable words, each 8 bits wide. In conventional binary memory-size notation, that is 16,384 words or 16 KiB. Keep bits (`b`) distinct from bytes (`B`): one byte is 8 bits, and one KiB is 1,024 bytes.

An address decoder selects a word using the address bus. A write stores the data on the data bus at the selected address, replacing its previous value. A read selects an address and puts the stored word on the data bus; the logical contents remain unchanged.

With a 3-bit address bus, for example, address `101₂` selects location 5. A write stores the input word there, and a later read from `101₂` returns it. DRAM cells require internal restoration after sensing, but that device-level action does not change the usual read operation seen at the memory interface.

### Chip Organization

**Memory chip:** 
- Address pins (A₀...Aₙ₋₁)
- Data pins (D₀...Dₘ₋₁)
- Control: CS (Chip Select), OE (Output Enable), WE (Write Enable)

**Example:** 64K×8 ROM
- 16 address lines (2¹⁶ = 64K)
- 8 data lines
- CS, OE

### Memory Expansion

**Word Expansion (wider data):**
```
Chip 1 (D₀-D₇)    ── D₀-D₇
Chip 2 (D₈-D₁₅)   ── D₈-D₁₅
Common address lines, common CS/OE/WE
```

**Address Expansion (more locations):**
```
          ┌── Chip 0 (CS0)
Addr[15]──┤
          └── Chip 1 (CS1)  (Addr[15] = 0→Chip0, 1→Chip1)
```

**Combined:** 4 chips 16K×8 → 64K×16

---

## Section 4 — Cache Memory

### Cache Basics

- **Block/Line:** Unit of transfer (typically 64 bytes)
- **Hit:** Data found in cache
- **Miss:** Data not in cache → fetch from memory

**Hit Rate:** h = hits / (hits + misses)
**Average Access Time:** t_avg = h·t_cache + (1-h)·t_memory

---

### Mapping Functions

| Mapping | Description | Pros | Cons |
|---------|-------------|------|------|
| **Direct Mapped** | Each block → exactly 1 cache line | Simple, fast | Conflict misses |
| **Fully Associative** | Any block → any line | Lowest misses | Complex, slow |
| **Set Associative** | Block → set of k lines | Balanced | Moderate complexity |

**Direct Mapped:**
- Address: Tag | Index | Offset
- Index selects line, Tag compares

**2-Way Set Associative:**
- Address: Tag | Set Index | Offset
- 2 lines per set, compare both tags

---

### Replacement Policies (Associative)

- **LRU (Least Recently Used):** Best, but complex for high associativity
- **FIFO:** Simple, reasonable
- **Random:** Simple, decent
- **LFU:** Rarely used

---

### Write Policies

| Policy | Write Hit | Write Miss |
|--------|-----------|------------|
| **Write-Through** | Write cache + memory | Write memory (no allocate) or allocate |
| **Write-Back** | Write cache only (dirty bit) | Allocate block, write cache |

**Write Buffer:** Queue for write-through to hide memory latency.

---

### Cache Performance Example

**Given:** t_cache=1ns, t_mem=100ns, hit rate=95%
**t_avg** = 0.95×1 + 0.05×100 = 0.95 + 5 = **5.95ns**

**Without cache:** 100ns. **Speedup:** 100/5.95 ≈ **16.8×**

---

## Section 5 — Virtual Memory

### Concept

Program sees **virtual address space** (e.g., 4GB). Physical memory smaller (e.g., 1GB). OS maps virtual pages to physical frames.

### Paging

- **Page:** Fixed-size block (typically 4KB)
- **Frame:** Physical memory block (same size)
- **Page Table:** Maps virtual page → physical frame

### Address Translation

**Virtual Address:** Page Number | Offset
**Physical Address:** Frame Number | Offset

**Page Table Entry (PTE):**
| Frame # | Valid | Dirty | Accessed | Protection |
|---------|-------|-------|----------|------------|

### TLB (Translation Lookaside Buffer)

Cache for page table entries. Typically 64-512 entries, fully associative.

**TLB Hit:** Fast translation (no page table walk)
**TLB Miss:** Walk page table in memory (slow)

---

### Page Fault

1. Valid bit = 0 in PTE
2. OS trap → page fault handler
3. Find free frame (or victim via LRU)
4. If victim dirty → write to disk
5. Read requested page from disk to frame
6. Update PTE, set Valid=1
7. Restart instruction

---

## Section 6 — Memory Interfacing & Timing

### Read Cycle (SRAM)

```
Address valid
    │
    ├── t_AA (Address Access Time) ── Data valid
    │
CS ──────┐
         ├── t_ACS (Chip Select Access)
OE ──────┘
         ├── t_OE (Output Enable Access)
```

### Write Cycle (SRAM)

```
Address valid
    │
WE ─────┐
        ├── t_AW (Address Setup to WE End)
        ├── t_WP (Write Pulse Width)
        ├── t_DW (Data Setup to WE End)
        ├── t_DH (Data Hold from WE End)
        └── t_WR (Address Hold from WE End)
```

### DRAM Read Cycle (Fast Page Mode)

```
RAS ──────\____________/
          │
CAS ──────\___/___/___/___
          │   │   │   │
Data ─────┘   └───┘   └─── (valid after t_CAC)
```

---

## Section 7 — Error Detection/Correction

### Parity Bit

Single bit: even/odd parity. Detects **1-bit errors**.

### Hamming Code (SECDED)

**Single Error Correction, Double Error Detection**

For m data bits, need r parity bits: 2ʳ ≥ m + r + 1

**Example: 8 data bits → 4 parity bits (2⁴=16 ≥ 8+4+1=13)**
Total 12 bits.

**Parity positions:** 1, 2, 4, 8 (powers of 2)
**Data positions:** 3, 5, 6, 7, 9, 10, 11, 12

Each parity bit covers positions where that bit is set in binary index.

**Syndrome:** XOR of received parity bits → indicates error position (0=no error).

---

## Section 8 — Memory Packaging

| Package | Description |
|---------|-------------|
| **DIP** | Dual In-line Package (through-hole) |
| **SOIC** | Small Outline IC (surface mount) |
| **TSOP** | Thin Small Outline Package |
| **BGA** | Ball Grid Array (high density) |
| **DIMM** | Dual In-line Memory Module (DRAM sticks) |
| **SIMM** | Single In-line Memory Module (older) |

---

## Section 9 — Past Exam Memory Problems

### Problem: Memory Address Decoding

> *A 64K×8 ROM is interfaced to a 16-bit address bus. How many address lines connected to ROM? How to decode chip select?*

**Solution:**
- ROM needs 16 address lines (A₀-A₁₅) for 64K
- If memory mapped at 0x0000-0xFFFF: CS = 1 (always enabled)
- If mapped at 0x8000-0xFFFF: CS = A₁₅
- If mapped at 0xC000-0xFFFF: CS = A₁₅·A₁₄

### Problem: Cache Hit Rate

> *Cache access 10ns, memory 100ns. Average access 20ns. Find hit rate.*

**Solution:** 20 = h×10 + (1-h)×100 = 10h + 100 - 100h = 100 - 90h
90h = 80 → h = 8/9 ≈ **88.9%**

### Problem: DRAM Refresh

> *DRAM requires refresh every 64ms. 8192 rows. How often to refresh one row?*

**Solution:** 64ms / 8192 = 7.8125μs per row. Or distributed: refresh one row every 7.8μs.

### Problem: Virtual Address Translation

> *32-bit virtual address, 4KB pages. How many bits for page number? Offset?*

**Solution:** 4KB = 2¹² → 12 offset bits. Page number = 32-12 = **20 bits**.

### Problem: Hamming Code

> *Data = 1011. Encode with Hamming (7,4).*

**Positions:** P1 P2 D1 P3 D2 D3 D4
**Data:** 1 0 1 1
**Calculate:**
- P1 (covers 1,3,5,7): P1⊕1⊕0⊕1 = 0 → P1=0
- P2 (covers 2,3,6,7): P2⊕1⊕1⊕1 = 0 → P2=1? Wait.
Let's do properly:
Positions: 1 2 3 4 5 6 7
Bits:      P1 P2 D1 P3 D2 D3 D4
Data D1=1, D2=0, D3=1, D4=1 at positions 3,5,6,7.

P1 (1,3,5,7): P1 ⊕ D1 ⊕ D2 ⊕ D4 = 0 → P1 = 1⊕0⊕1 = 0
P2 (2,3,6,7): P2 ⊕ D1 ⊕ D3 ⊕ D4 = 0 → P2 = 1⊕1⊕1 = 1
P4 (4,5,6,7): P4 ⊕ D2 ⊕ D3 ⊕ D4 = 0 → P4 = 0⊕1⊕1 = 0

Codeword: 0 1 1 0 0 1 1 = **0110011**

---

## Section 10 — Self-Check Problems

1. 32K×8 SRAM: address lines? data lines? If 4 chips for 128K×8, show connections.
2. Direct-mapped cache: 16KB, 64-byte blocks, 32-bit address. Tag/Index/Offset bits?
3. 2-way set associative: 8KB, 32-byte blocks, 32-bit address. Tag/Set/Offset?
4. DRAM: 1M×4, needs 4ms refresh, 1024 rows. Refresh interval per row?
5. Hamming: Encode 1101. Detect/correct error in received 1100101?
6. Virtual memory: 48-bit virtual, 36-bit physical, 4KB pages. Page table entries per process?

---

## Solutions

1. **32K×8:** 15 addr, 8 data. 4 chips: A₀-A₁₄ common, A₁₅-A₁₆ decode CS (4 chips).
2. **Direct Mapped:** 16KB=2¹⁴, 64B=2⁶ → 2⁸=256 lines. Index=8, Offset=6, Tag=32-8-6=18.
3. **2-way:** 8KB=2¹³, 32B=2⁵ → 2⁸ blocks total, 2⁷=128 sets. Set=7, Offset=5, Tag=20.
4. **DRAM Refresh:** 4ms/1024 = 3.9μs per row.
5. **Hamming 1101:** P1=0, P2=1, P4=0 → 0110011. Received 1100101: syndrome calculation...
6. **Page Table:** 48-12=36 bits VPN. 2³⁶ entries per process (huge → multi-level).

---

## Glossary Terms

[[memory-hierarchy]], [[sram]], [[dram]], [[rom]], [[prom]], [[eprom]], [[eeprom]], [[flash-memory]], [[nor-flash]], [[nand-flash]], [[cache-memory]], [[cache-line]], [[block]], [[hit]], [[miss]], [[hit-rate]], [[direct-mapped]], [[fully-associative]], [[set-associative]], [[replacement-policy]], [[lru]], [[fifo]], [[write-through]], [[write-back]], [[dirty-bit]], [[write-buffer]], [[virtual-memory]], [[paging]], [[page]], [[frame]], [[page-table]], [[page-table-entry]], [[tlb]], [[translation-lookaside-buffer]], [[page-fault]], [[memory-protection]], [[hamming-code]], [[sec-ded]], [[parity-bit]], [[error-correction]], [[memory-interleaving]], [[memory-bank]], [[address-decoding]], [[chip-select]], [[ras]], [[cas]], [[refresh]], [[memory-timing]], [[access-time]], [[cycle-time]]