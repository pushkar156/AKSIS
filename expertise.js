// Tab switching logic for Processing Tabs

document.addEventListener('DOMContentLoaded', function () {
    const tabNav = document.getElementById('processingTabsNav');
    if (!tabNav) return;
    const tabButtons = tabNav.querySelectorAll('.processing-tab-btn');
    const tabPanels = document.querySelectorAll('.processing-tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            const tab = this.getAttribute('data-tab');
            const panel = document.querySelector('.processing-tab-panel[data-tab="' + tab + '"]');
            if (panel) panel.classList.add('active');
            // Scroll tab into view if needed
            this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
    });

    // Optional: Keyboard navigation for accessibility
    tabNav.addEventListener('keydown', function (e) {
        const current = document.activeElement;
        if (!current.classList.contains('processing-tab-btn')) return;
        let idx = Array.from(tabButtons).indexOf(current);
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const next = tabButtons[(idx + 1) % tabButtons.length];
            next.focus();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prev = tabButtons[(idx - 1 + tabButtons.length) % tabButtons.length];
            prev.focus();
        }
    });
});

function openProcessingDrawer(btn) {
    var content = '';
    var type = btn ? btn.getAttribute('data-drawer') : '';
    if (type === 'granulating') {
    content = `
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/processing/tablets/image copy 6.png' alt='High Shear Mixer Granulator'>
        </div>
        <div class="processing-card-details">
          <h3>Granulating<br><span style='font-weight:400;font-size:1rem;'>High Shear Mixer Granulator</span></h3>
          <p>High shear mixer granulator is developed to mix ingredients thoroughly and it can also be used for Wet Granulation process for Tablets and Capsules manufacturing process. There are several advantages of this process. Our equipment provides high level hygiene as per cGMP norms. Time for operation is less and you will get consistency in granule mass. Major benefit provided by our equipment is homogeneous mixing of ingredients. Major parts of High shear mixer granulator like Mixing Bowl, Granulator, side discharge valve and conical mills makes it perfect for operation and we supply as per pharma standards.</p>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/processing/tablets/image copy 7.png' alt='Binder Preparation Vessel'>
        </div>
        <div class="processing-card-details">
          <h3>Granulating<br><span style='font-weight:400;font-size:1rem;'>Binder Preparation Vessel</span></h3>
          <p>Binder Preparation Vessel is capable of making good quality starch paste in a minimum amount of time. The offered vessel is designed uniquely for optimal mixing efficiency so as to ensure a homogeneous mix. Available in various specifications, it can also be custom designed as per the needs of the clients with promised time-frame. Variable rotation rate possible, integration of flow rate control assembly into system, cleaning & maintenance are some key features of this Binder Preparation Vessel.<br><br>Binder Preparation Vessel has been designed uniquely for optimal mixing efficiency so as to ensure a homogeneous mix. The special stirrer in the vessel has been designed to create vortex inside the solvent which enhances the desired solubility of pharmaceutical binder solute into the various solvents. Due to its unique design the binder solution can be directly transferred to the other processing equipment such as high shear mixer granulator, planetary mixers or fluid bed processor.</p>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
    `;
    }
    else if (type === 'drying') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 8.png' alt='Fluid Bed Equipment'>
      </div>
      <div class="processing-card-details">
        <h3>Drying<br><span style='font-weight:400;font-size:1rem;'>Fluid Bed Equipment</span></h3>
        <p>Fluid Bed Dryer works on the principle of creating a fluid turbulence in granulated or wet powder product by means of hot air flowing in an upward direction and drying the product to a desired temperature. Unique design of perforated plate for uniform drying without any racking process.<br><br>Wet granules are completely fluidized by a powerful stream or electrical hot air, the above achieving high heat transfer rate and uniform temperature across the product.<br><br>Fluidized bed drying can be used in the entire powder processing industry. In the pharmaceutical industry, this innovative method has replaced the time-consuming drying in trays. This method provides excellent and uniform drying conditions compared to the uneven drying in trays.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 9.png' alt='Tray Dryer'>
      </div>
      <div class="processing-card-details">
        <h3>Drying<br><span style='font-weight:400;font-size:1rem;'>Tray Dryer</span></h3>
        <p>The Tray Dryer from Aksis assures you of rapid, high-quality and convenient drying technology, with the added edge of cGMP features, viz., rounded contours & polished surfaces. Our multi-tray/cavity tray dryer finds wide application in Pharmaceutical, Nutraceutical, Food, Chemicals, Cosmetic & other allied industries.</p>
        <ul style='text-align:left; margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
          <li>Two tier trolley with SS Rollers</li>
          <li>Advanced Controls</li>
          <li>Tray design with double door provision</li>
          <li>Enhanced performance by tough insulation</li>
          <li>HEPA filtered Hot Air</li>
          <li>Rounded corners and angles</li>
          <li>Easy accessibility of internals for Hygienic cleaning</li>
          <li>Heater and fan combination internally all over the chamber with a variation of just ± 2°C</li>
        </ul>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
    </div>
    <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 10.png' alt='Roto Cone Vacuum Dryer'>
      </div>
      <div class="processing-card-details">
        <h3>Drying<br><span style='font-weight:400;font-size:1rem;'>Roto Cone Vacuum Dryer</span></h3>
        <p>Roto Cone Vacuum Dryer is suitable for drying materials that cannot resist high temperature, easily oxidisable materials, volatile materials that should be retrieved, and strong irritant and poisonous materials. The Roto Cone Vacuum Dryer with improved technology integrates during operation under vacuum, thus reducing drying time and energy consumption. The unique design of the dryer ensures maximum efficiency, less handling, and complete discharge of the product.<br><br>The dryer is equipped with inline breakers which breaks large lumps and promotes uniform drying, with better mechanical action, cuts down drying time and gives a lump-free product.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
    </div>
    `;
    }
    else if (type === 'milling') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 11.png' alt='Cone Mill'>
      </div>
      <div class="processing-card-details">
        <h3>Milling<br><span style='font-weight:400;font-size:1rem;'>Cone Mill</span></h3>
        <p>Cone Mills are low energy and versatile mills for the gentle, intermediate grinding and deagglomeration of powders and granules.<br><br><b>Features</b></p>
        <ul style='text-align:left; margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
          <li>Versatile Intermediate Mill</li>
          <li>Multiple drive configurations</li>
          <li>Variable speed drive</li>
          <li>Low heat generation</li>
          <li>Gentle grinding action to minimize fines</li>
        </ul>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 12.png' alt='Under Driven Cone Mill'>
      </div>
      <div class="processing-card-details">
        <h3>Milling<br><span style='font-weight:400;font-size:1rem;'>Under Driven Cone Mill</span></h3>
        <p>Underdriven cone mill has a compact, inline design with a short head height which allows for easy integration into powder mixing and processing environments. It provides improvement in productivity.<br><br>Small size, perfect design, short head height helps to integrate into processing environments where space is constricted. A large-diameter infeed and straight-through housing promote unhindered inline product flow for quicker discharge, and therefore higher throughput, improving productivity.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 13.png' alt='Multi Mill'>
      </div>
      <div class="processing-card-details">
        <h3>Milling<br><span style='font-weight:400;font-size:1rem;'>Multi Mill</span></h3>
        <p>Aksis Multi mill is used for high speed Granulating, Pulverizing, Mixing, Shredding and Chopping, etc. of a wide range of wet and dry materials without special attachments. As compared to the four common principles of reduction, i.e. grinding, compression, impact and shearing, which do not produce controlled particle size, the Multi mill operates successfully using hammer blades and knives which utilizes the impact and shearing actions. Hammer/knife blades both levels and impact edges rotating reduction, this with a carefully selected screen for control size reduction.<br><br><b>Features</b></p>
        <ul style='text-align:left; margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
          <li>Machine Portable on Caster wheels</li>
          <li>Multiple combinations of blades can be changed using a Reversing switch for Hammer or Knife operation</li>
          <li>Multiple combinations of Screens / Speeds / Number of Blades</li>
          <li>Detachable in rotation for easy product change</li>
          <li>Higher Screen opening area for Higher Throughput</li>
          <li>Easy Dismantling and Cleaning of all Components reducing.</li>
        </ul>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 14.png' alt='Sifter Cum Multi Mill'>
      </div>
      <div class="processing-card-details">
        <h3>Milling<br><span style='font-weight:400;font-size:1rem;'>Sifter Cum Multi Mill</span></h3>
        <p>A perfect combination of sifting and milling, the equipment was conceived to break through sifting and powder separation setups and eliminate process limitations. The new generation of inline sifter cum multi mill has the right configuration and options. The fine powder hits the main discharge port, while the coarse carbuncles in process tend to fall into the milling basket. The sifter enables the further broken into smaller fractions via the fixed impeller and screen, thus maintaining the uniform product release. The SS 316 Sieves present in the sifting and milling chamber actually determines the final product size.<br><br>Request GA Drawing/Enquire Now...</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'blending') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 15.png' alt='V Blender'>
      </div>
      <div class="processing-card-details">
        <h3>Blending<br><span style='font-weight:400;font-size:1rem;'>'V' Blender</span></h3>
        <p>V Cone Blender is an intensive mixing system designed specially to handle ordered dry mixing of excipients such as cohesive as well as adhesive powder. This rotating shell V-type blender with no packing glands around the shafts entering the chamber ensure total elimination of cross contamination. The special design ensures minimal attrition when blending fragile granules and is suitable for Pharmaceutical, Nutraceutical, Food & Cosmetic industries.<br><br><b>Features</b></p>
        <ul style='text-align:left; margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
          <li>Rotating V-Type Shell with large capacity</li>
          <li>Intensifier bar for special applications available</li>
          <li>Easy loading & unloading</li>
          <li>Dust-free operations when combined with Bin charging system</li>
          <li>Special baffles to increase mixing shear</li>
          <li>Near complete discharge of product material</li>
          <li>Integrated Vacuum loading option available</li>
          <li>Material of construction SS 316L</li>
          <li>No shaft projection; hence no product contamination</li>
          <li>Easy to clean with internal attachments like lump breakers and liquid dispensers</li>
          <li>Wide Capacity options available from 5 - 1200L, with custom made capacities upto 10000L</li>
        </ul>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 16.png' alt='Conta Blender'>
      </div>
      <div class="processing-card-details">
        <h3>Blending<br><span style='font-weight:400;font-size:1rem;'>Conta Blender</span></h3>
        <p>Enhance quality control, increase product quality and reduce production costs by implementing a Aksis IBC blending and material handling system. To insure compatibility with your products we offer a complete range of IBC types and blenders such as round, square, and rectangular. We offer complete, in-house, consulting and designing services to aid your company in employing an IBC handling and blending operation. From the initial concept to the plant survey and manufacturing of the equipment and systems, Aksis has the experience and knowledge to get your process online today.<br><br><b>Features</b></p>
        <ul style='text-align:left; margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
          <li>Variable speed control with digital speed</li>
          <li>Indication</li>
          <li>Bin clamping-compensation System</li>
          <li>Powder levelling system</li>
          <li>Digital timer</li>
          <li>Position control</li>
          <li>Emergency Stop</li>
          <li>Interlocked clamping and blending for 100% fail-safe operation</li>
          <li>Schneider PLC & VFD - all CE parts</li>
        </ul>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 17.png' alt='Octagonal Blender'>
      </div>
      <div class="processing-card-details">
        <h3>Blending<br><span style='font-weight:400;font-size:1rem;'>Octagonal Blender</span></h3>
        <p>MMPE OCTAGONAL BLENDER, due to its octagonal shape is designed to process larger volume of material. It occupies less space compared to other similar blenders like 'V' and Double Cone. Power consumption is also less. The blending takes place at low speed during operation. It is well balanced even in higher capacities. It is very useful for pharmaceutical industries wherein gentle blending of dry granules of powder is to be done. It is a slow speed blender and has removable type baffles mounted on a rectangular shell. The important feature of the machine is easy to wash in place. Octagonal blender is supplied with a bin charging system or can be designed for vacuum charging. Dust free charging system is also incorporated, which is a completely closed system for charging and discharging of powders or granules. The power consumption is comparatively lower than other similar type of blenders. The machine basically consists of shell welded with conical Octagonal shape ends and supported with sturdy supports on both side.<br><br>The right hand side shaft is connected to a standard gearbox by means of chain and sprockets, which in turn is coupled to an electric motor. The whole drive assembly is covered with S.S. side panel. The inside portion of Octa body is mirror polished and the outside surface of Octa body, frame & guards are matt polished. The material to be mixed is charged in machine either manually from top or bin charging system or vacuum charging system and then the port is locked positively. Then blender is started to preset blending time. At the end of process, machine is stopped and the product is transferred to process containers by opening the butterfly value.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 18.png' alt='Double Cone Blender'>
      </div>
      <div class="processing-card-details">
        <h3>Blending<br><span style='font-weight:400;font-size:1rem;'>Double Cone Blender</span></h3>
        <p>The folding, spreading, and cascading action of the Aksis's Conical Blender provides a rapid, homogeneous blending of dry and semi dry materials. The end over end revolving action, moving materials in and out of a restricted area results in a thorough intermeshing of the products into a uniform mix.<br><br>Batch working capacities<br>Range from Lab Model to Production Model (upto 4000 ltrs) based on fill level of 55% of total volume. Each blender design is customized to suit the customer's specific requirements.<br>For improved blend uniformity<br>Special designs incorporating internal deflector cones, or angled shell bodies are available upon request.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 19.png' alt='Ribbon Blender'>
      </div>
      <div class="processing-card-details">
        <h3>Blending<br><span style='font-weight:400;font-size:1rem;'>Ribbon Blender</span></h3>
        <p>Ribbon Blender is a light duty, compact blender is designed to achieve convection mechanism of blending powder components which are pre-processed like dried granules, pre-sieved powders etc. It is a LOW SHEAR mixer and ideal for SOLID / SOLID Mixing. Solid / Liquid mixing can also be achieved when high shearing force is not desired.<br><br><b>Features</b></p>
        <ul style='text-align:left; margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
          <li>Available in two shapes - U & W</li>
          <li>Meets all cGMP/cGEP standards</li>
          <li>U-for Low to Medium volume Capacity (single shaft)</li>
          <li>Continuous Ribbon design for complete discharge</li>
          <li>W-for Large to Mega volume Capacity (double shaft)</li>
          <li>Variable frequency drive for fine tuning the Shear energy</li>
          <li>All contact parts in SS 316L</li>
          <li>Belt driven power transmission</li>
          <li>Designed to avoid Cross contamination with Monoblock Design</li>
          <li>Reduced material handling with Top mounted charging port and Side discharge arrangement</li>
          <li>Bearing mounted on lanterns out of mixing zone</li>
          <li>Paddle style agitator instead of Ribbon for Blending fragile materials</li>
          <li>Air purge on the side entry seals</li>
          <li>Lance type injectors for liquid spraying</li>
        </ul>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 20.png' alt='Plough Shear Mixer'>
      </div>
      <div class="processing-card-details">
        <h3>Blending<br><span style='font-weight:400;font-size:1rem;'>Plough Shear Mixer</span></h3>
        <p>Lorem ipsum dolor sit amet, pro ne labitur suavitate, vero persequeris vis no, ea nam iuvaret efficiantur. Usu aliquam patrioque ad, at ipsum molestie postulant mea. Eam corrumpit liberavisse in, altera luptatum qui in, qui ad virtute nonumes appellantur. Graeci saperet ea sea. Per at consul contentiones, mea stet doctus instructor ex.<br>Lorem ipsum dolor sit amet, pro ne labitur suavitate, vero persequeris vis no, ea nam iuvaret efficiantur. Usu aliquam patrioque ad, at ipsum molestie postulant mea. Eam corrumpit liberavisse in, altera luptatum qui in, qui ad virtute nonumes appellantur. Graeci saperet ea sea. Per at consul contentiones, mea stet doctus instructor ex.Lorem ipsum dolor sit amet, pro ne labitur suavitate, vero persequeris vis no, ea nam iuvaret efficiantur. Usu aliquam patrioque ad, at ipsum molestie postulant mea. Eam corrumpit liberavisse in, altera luptatum qui in, qui ad virtute nonumes appellantur. Graeci saperet ea sea. Per at consul contentiones, mea stet doctus instructor ex.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'material-handling') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 21.png' alt='Elevator'>
      </div>
      <div class="processing-card-details">
        <h3>Material Handling<br><span style='font-weight:400;font-size:1rem;'>Elevator</span></h3>
        <p>Tablet elevator feeds and allows the filling of the tablet hopper to be completed at a reasonable height by the operator, with the elevator then lifting and delivering tablets to the tablet counter.<br>The elevator can be retrofitted to all makes and models of tablet counters and handles most shapes and sizes of tablets.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 22.png' alt='Tipper'>
      </div>
      <div class="processing-card-details">
        <h3>Material Handling<br><span style='font-weight:400;font-size:1rem;'>Tipper</span></h3>
        <p>The Tipper-Lifting and tipping device is a hydraulic device which is having an arm used for lifting and turning FBD bowl by 180. Thus it is used to unload fluid bed dryer bowl material in to Cone mill OR Multi mill OR Oscillating granulator in a dust free way for down sizing or dry milling. The operation is completely dust free and eliminates manual handling or scooping.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 23.png' alt='Powder Transfer System'>
      </div>
      <div class="processing-card-details">
        <h3>Material Handling<br><span style='font-weight:400;font-size:1rem;'>Powder Transfer System</span></h3>
        <p>Transfer devices are integral components for your powder handling needs. They are designed for contained product transfer out of bins to tablet presses, encapsulators and reactor/liquid vessels and can transfer products through the floor to equipment on another level.<br>Fill and Discharge Stations are also used for bin filling, tablet transfer from bin to packaging equipment and capsule transfer from bin to encapsulator. Pivot Dumpers provide a quick and contained method of emptying open top containers such as Drums, Gaylords, Open-Top Bins and any other container that can be discharged by inverting.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 24.png' alt='IBC'>
      </div>
      <div class="processing-card-details">
        <h3>Material Handling<br><span style='font-weight:400;font-size:1rem;'>IBC (in-process batch container)</span></h3>
        <p>Many times we see product is handled in small containers like Drums, small kegs or boxes which is traditional process. But now a days wecan see IBC's can be used as an alternative for the same.<br>The benefits of using IBCs for efficient and flexible materials handling are widely appreciated and applied in modern facilities. Handling tablets in larger, single containers offer significant benefits and could reduce manufacturing costs whilst improving production efficiency, quality and safety.<br>It is common to find Intermediate Bulk Containers (IBCs) being used for handling powders and granules in solid dosage manufacturing processes, from initial Dispensing through to Tablet Compression or Capsule Filling. The benefits of using IBCs for efficient and flexible materials handling at this stage of the process are widely appreciated and applied in modern facilities.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 25.png' alt='Pallet Weighing Truck'>
      </div>
      <div class="processing-card-details">
        <h3>Material Handling<br><span style='font-weight:400;font-size:1rem;'>Pallet Weighing Truck</span></h3>
        <p>This stainless steel hand pallet truck scale is built according to GMP norms. All welds are continuous and polished, all surfaces electro polished. The fork surfaces are completely closed, the underside of the forks are open, to prevent the accumulation of moisture or substances. All bearings on the truck are made of lubrication free polymers. The hydraulics contain Highly accurate weighing. Touch screen indicator that offers functional programs for recipe weighing, dosing, and for entry and registration of product-ID's.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'cleaning') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 26.png' alt='Bin Wash System'>
      </div>
      <div class="processing-card-details">
        <h3>Cleaning<br><span style='font-weight:400;font-size:1rem;'>Bin Wash System</span></h3>
        <p>Batch bin washing machines for all types of large food and waste containers. Specifically designed for thorough, efficient and economical cleaning. Can accommodate all types of wheeled bins or unwheeled IBC containers and pallets.<br>We can supply wide range of industrial bin washers for the automatic cleaning of a wide variety of wheeled bins, Eurobins and vessels used in the pharma and food manufacturing industrie. We can supply machines to clean bins used in hospitals and similar facilities as well as vessels used in pharmaceutical manufacture.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/tablets/image copy 27.png' alt='CIP / WIP Skid'>
      </div>
      <div class="processing-card-details">
        <h3>Cleaning<br><span style='font-weight:400;font-size:1rem;'>CIP / WIP Skid</span></h3>
        <p>Clean in place (CIP) / Wash in place (WIP) technology offers reliable cleaning of process equipment and piping with fully automated system.<br>The CIP/WIP system is designed to achieve efficient circulation of cleaning medium such as purified water , hot water, detergent solution with special provision of sanitization to emphasize purity.<br>It gives complete clean system. Proper CIP design with regulated time, flow, and temperature to throughly remove residue.<br>It also carries use friendly maintainence with ergonomic design.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'soft-gelatin') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/capsules/image copy 2.png' alt='Soft Gelatin'>
      </div>
      <div class="processing-card-details">
        <h3>Soft Gelatin</h3>
        <p>Soft gelatin capsules have gained popularity in the pharmaceutical industry for human and veterinary use due to the many advantages it possesses over other commonly used solid dosage forms such as tablets, hard gelatin capsules etc.<br>The bioavailability of hydrophobic drugs can be significantly increased when formulated into soft gelatin capsules.<br>We bring a technology to make soft gelating capsule product.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'hard-gelatin') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/capsules/image copy 3.png' alt='Hard Gelatin'>
      </div>
      <div class="processing-card-details">
        <h3>Hard Gelatin<br><span style='font-weight:400;font-size:1rem;'>Milling & Sewing</span></h3>
        <p>Pharma manufacturers know that particle size is crucial in affecting the properties of bioavailability and stability, especially when developing new drugs and treatments. If manufacturers want some molecules to be more potent then they need to be able to achieve the finest of Particle Size Distribution (PSDs).<br>We can supply milling equipment which will enable you to achieve smaller particle sizes & tighter particle size distributions than are possible using standard competitive conical mills, hammer mills, or pin mills. This equates to effective products, reduced waste, and increased profit margins....</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'reactors') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/chemicals/image.png' alt='Reactors / Pressure Vessels'>
      </div>
      <div class="processing-card-details">
        <h3>Reactors / Pressure Vessels</h3>
        <p>We supply and cater Chemical, Fine Chemical Industries, with a Quality Pressure Vessels and Rectors. Manufactured to deliver the highest-quality results. We are capable of supplying the complete range of ASME jacketed vessels, unpressurized vessels, columns, spool pieces, structural systems, and custom equipment.<br><br>We are serving the pressure vessel market in a wide range of jacketed vessel, and storage tank applications designed and fabricated in accordance with International Standards like ASME. All equipments inspected and certified at respective location with detailed Quality Control procedures.<br><br>Fabrication and welding are key factors and we take utmost care for them. Manufacturer always continue to invest in weld process technology which is key factor for reactor and pressure vessels, including a range of manual, semi-automatic, and fully automatic welding procedures.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'effervescent') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/processing/effervescent/image.png' alt='For Effervescent Powders'>
      </div>
      <div class="processing-card-details">
        <h3>For Effervescent Powders<br><span style='font-weight:400;font-size:1rem;'>For Effective Powders</span></h3>
        <p>The manufacture of effervescent tablets is similar in many ways to that of conventional granules or tablets, although due to the hygroscopicity and potential onset of the effervescence reaction in the presence of water, environmental control of relative humidity and water levels is of major importance during manufacture.<br><br>The equipment used in the manufacture of effervescent tablets are also the same as that for conventional tablets; the only difference is that it uses the rotatory press with special adaptations for compression. We supply complete solution for reparation of Effervescent tablet granules.</p>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'tablet-press') {
    content = `
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/tablets/image.png' alt='Tablet Press Machines'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Tablet Press Machines</h3>
        <ul style=\"margin-bottom: 1rem; color: #4a5568; font-size: 1rem;\">
          <li>Perfect for Research & Development.</li>
          <li>Turret of SG IRON 500/7 Graded casting.</li>
          <li>High versatility & superior through compact design.</li>
          <li>Easy compacting of Filling depth, tablet thickness and tamping tablet thickness.</li>
          <li>Over load pressure release mechanism.</li>
          <li>Output varied through AC variable frequency drive from the control panel.</li>
        </ul>
        <div class=\"processing-card-actions\">
          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>
          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'tablet-tooling') {
    content = `
     <div class="processing-card drawer-card">
      <div class="processing-card-image">
        <img src='assets/expertise/manufacturing/tablets/image copy.png' alt='Tablet Tooling'>
      </div>
      <div class="processing-card-details">
        <h3>Tablet Tooling</h3>
        <div style="overflow-x:auto;">
          <style>
            .drawer-table, .drawer-table th, .drawer-table td {
              border: 1px solid #bfc8d9;
            }
            .drawer-table {
              border-collapse: collapse;
            }
            .drawer-table th, .drawer-table td {
              padding: 7px 8px;
              text-align: left;
            }
            .drawer-table thead th {
              background: #334897;
              color: #fff;
            }
            .drawer-table thead tr:nth-child(2),
            .drawer-table thead tr:nth-child(3) {
              background: #f4f6fa;
              color: #222;
            }
          </style>
          <table class="drawer-table" style="width:100%; margin-bottom:1.2rem;">
            <thead>
              <tr>
                <th colspan="7">TYPES OF TOOLING</th>
              </tr>
              <tr>
                <th>TYPE</th>
                <th colspan="2">PUNCH DIAMETER</th>
                <th colspan="2">DIE DIAMETER</th>
                <th colspan="2">DIE THICKNESS</th>
              </tr>
              <tr>
                <th></th>
                <th>INCH</th><th>MM</th>
                <th>INCH</th><th>MM</th>
                <th>INCH</th><th>MM</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>XHDL</td><td>2.5000</td><td>63.5</td><td>3.000</td><td>76.2</td><td>1.875</td><td>1.875</td></tr>
              <tr><td>XHD</td><td>2.2500</td><td>57.15</td><td>2.750</td><td>69.85</td><td>1.500</td><td>38.100</td></tr>
              <tr><td>BOLUS</td><td>1.750</td><td>44.45</td><td>2.125</td><td>53.98</td><td>1.187</td><td>30.15</td></tr>
              <tr><td>SLUG</td><td>1.250</td><td>31.75</td><td>2.000</td><td>50.80</td><td>0.938</td><td>23.83</td></tr>
              <tr><td>D</td><td>1.000</td><td>25.40</td><td>1.500</td><td>38.10</td><td>0.938</td><td>23.83</td></tr>
              <tr><td>DB</td><td>1.000</td><td>25.40</td><td>1.187</td><td>30.15</td><td>0.875</td><td>22.22</td></tr>
              <tr><td>B</td><td>0.750</td><td>19.05</td><td>1.187</td><td>30.15</td><td>0.875</td><td>22.22</td></tr>
              <tr><td>DB</td><td>0.750</td><td>19.05</td><td>0.945</td><td>24.00</td><td>0.875</td><td>22.22</td></tr>
            </tbody>
          </table>
          <table class="drawer-table" style="width:100%; margin-bottom:1.2rem;">
            <thead>
              <tr>
                <th colspan="2">MATERIAL OF CONSTRUCTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DIES</td>
                <td>HCHC(D2, D3) Steel & Solid Carbide</td>
              </tr>
              <tr>
                <td>PUNCHES</td>
                <td>OHNS Steel, HCHC(D2, D3) Steel, S7 Steel</td>
              </tr>
            </tbody>
          </table>
          <table class="drawer-table" style="width:100%;">
            <thead>
              <tr>
                <th>TYPES OF COATING</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Hard chrome Plating(HCP)<br>
                  Chromium Nitrite (CRN), Multi(CRN),<br>
                  Titanium nitrite (TiN)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="processing-card-actions">
          <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
          <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
        </div>
      </div>
    </div>
    `;
    }
    else if (type === 'soft-gelatin-mfg') {
    content = `
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/capsules/image.png' alt='Soft Gelatin'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Soft Gelatin<br><span style='font-weight:400;font-size:1rem;'>Capsule Filling Machines</span></h3>
        <p>We can supply modern and state of the art technology equipment for Soft gelatin capsule manufacturing. This is one equipment which includes process of making Soft gelatin shell with liquid / drug inside. This is proven technology.<br><br>Available in R&D Models, Manual, SA, Auto</p>
        <div class=\"processing-card-actions\">\n          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>\n          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>\n        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'hard-gelatin-mfg') {
    content = `
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/capsules/image copy.png' alt='Hard Gelatin'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Hard Gelatin<br><span style='font-weight:400;font-size:1rem;'>Capsule Filling Machine</span></h3>
        <b>Manual</b>
        <p>The Manual Capsule Filling Machine (MCFM) is one of the oldest as well as the most popular and widely used form of capsule filling. It is widely appreciated by our clients for easy operations and high rate of production with minimum rejection and variation. The machine is designed and manufactured with utmost care to handle all sizes ranging from 00 to 5 and to give you trouble free services year after year.<br><br>The manual capsule filling machine is widely used in research laboratories, academic institution and medium to small scale manufacturing industries. These manual machines can easily fill powders, pellets in all sizes of hard gelatin capsules and therefore help in R & D purpose, small batches, trial run for large scale as well as regular production in small scale pharmaceutical companies.</p>
        <b>Features</b>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>Function design for simplified operation giving precise result with negligible rejection.</li>
          <li>Sturdy and easily movable.</li>
          <li>Excellent cost benefit ratio.</li>
          <li>Easy availability of spares.</li>
          <li>Capsule Size : 00, 0, 1, 2, 3, 4, 5.</li>
        </ul>
        <b>Technical Specifications</b>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>Output : 6500 to 7000 capsules/hr.</li>
          <li>Length - 405 mm.</li>
          <li>Width - 300 mm.</li>
          <li>Height - 455 mm.</li>
          <li>Weight - 40.0 Kg.</li>
        </ul>
        <div class=\"processing-card-actions\">
          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>
          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/capsules/image copy 2.png' alt='Semi Automatic'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Available in R&D Models, Manual, SA, Auto<br><span style='font-weight:400;font-size:1rem;'>Semi Automatic</span></h3>
        <p>Semi Automatic Capsule Filling Machine is designed for precision manufacturing requirements of modern pharmaceutical procedures. Capsule Filling Machine is suitable to fill size 00 to 5 capsules with powder, granules or pellets. We are having three different models which provide production output ranging from 25000 capsules per hour to 45000 capsules per hour. Machine provides high Degree of automation with higher levels of filling weight accuracy. Machine is made as per GMP standards having all Stainless Steel covering. Machine having wide usage in R&D laboratories, Research Institutions, Herbal & Nutraceutical preparations, Unani &Ayurvedic medicines, Pilot batch productions etc.<br><br>We can provide line equipments naming Capsule Conveying System, Capsule Polishing Machine, Dust Extractor, Damage Capsule Sorter and Empty Capsule Ejector to make complete Semi-Automatic Capsule Filling Line.</p>
        <b>Features</b>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>Application: Filling Capsules with powder, pellets & granules</li>
          <li>Usage: Pharmaceutical, Nutritional, Biotech, Health Supplement, Food Product & Cosmetics</li>
        </ul>
        <div class=\"processing-card-actions\">
          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>
          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/capsules/image copy 3.png' alt='Fully Automatic'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Available in R&D Models, Manual, SA, Auto<br><span style='font-weight:400;font-size:1rem;'>Fully Automatic</span></h3>
        <b>Capacity 25000</b>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>Fully-automatic capsule filling machine that can fill a large variety of powder formulations into hard gelatin capsules. It has an output of 25,000 capsules per hour for powder and an output for pellets of 23,000 capsules per hour. The machine is formulation friendly and uses a tamping process to form the slug that is inserted into the empty capsule.</li>
          <li>Can be used with powders, pellets and combination fillings.</li>
          <li>The machine conforms to GMP guidelines.</li>
          <li>The precise slug dosing principle enables high filling accuracy, which increases yield and helps save money.</li>
          <li>Capsule size and product changeover is quick and easy.</li>
        </ul>
        <b>Capacity 40000</b>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>Fully-automatic capsule filling machine that can fill a large variety of powder formulations into hard gelatin capsules. It has an output of 40,000 capsules per hour for powder and an output for pellets of 35,000 capsules per hour.</li>
          <li>The machine is formulation friendly and uses a tamping process to form the slug that is inserted into the empty capsule. Can be used with powders and pellets.</li>
          <li>The machine conforms to GMP guidelines.</li>
          <li>The precise slug dosing principle enables high filling accuracy, which increases yield and helps save money.</li>
          <li>Capsule size and product changeover is quick and easy.</li>
        </ul>
        <b>Capacity 90000</b>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>Fully-automatic capsule filling machine that can fill a large variety of powder formulations into hard gelatin capsules. It has an output of 90,000 capsules per hour for powder and an output for pellets or combination tablets of 80,000 capsules per hour. The machine is formulation friendly and uses a tamping process to form the slug that is inserted into the empty capsule.</li>
          <li>The machine conforms to GMP guidelines.</li>
          <li>The precise slug dosing principle enables high filling accuracy, which increases yield and helps save money.</li>
          <li>Capsule size and product changeover is quick and easy.</li>
        </ul>
        <div class=\"processing-card-actions\">
          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>
          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/capsules/image copy 4.png' alt='Line Machines'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Available in R&D Models, Manual, SA, Auto<br><span style='font-weight:400;font-size:1rem;'>Line Machines</span></h3>
        <b>Elevator</b>
        <p>Elevator ensures feeding of good quality empty capsules to the capsule filling machine hopper. It sorts out the diametrically defective capsules through a sorting plate and ensures that the correct sized capsules are conveyed to the capsule filling machine hopper for uninterrupted running of the machine.</p>
        <div class=\"processing-card-actions\">
          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>
          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/capsules/image copy 5.png' alt='Polisher'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Available in R&D Models, Manual, SA, Auto<br><span style='font-weight:400;font-size:1rem;'>Polisher</span></h3>
        <p>If capsules are not dedusted and polished, a lot of residual dust may make its way into the packaging equipment, resulting in obscured sensors, powder ingress in mechanical gears, belts, etc. This then leads to downtime and higher maintenance costs in packaging, bottles or blisters not sealing product properly, and patient compliance issues if the capsules do not appear cosmetically clean.</p>
        <b>Features</b>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>The DP-100 is an advanced de-dusting and polishing machine.</li>
          <li>It combines cGMP design and the most efficient method of polishing with engineering features that makes it easier to clean and maintain.</li>
          <li>This flexibility results in a higher degree of operating efficiency and cleanliness.</li>
          <li>The DP-100 can be introduced into an existing production line or can be used by itself with a visual inspection unit.</li>
        </ul>
        <div class=\"processing-card-actions\">
          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>
          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/capsules/image copy 6.png' alt='Metal Detector'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Available in R&D Models, Manual, SA, Auto<br><span style='font-weight:400;font-size:1rem;'>Metal Detector</span></h3>
        <p>Detects all types of metals including ferrous, stainless steel, aluminum, copper and brass through examination of pills and capsules. Reliable detection of free or encapsulated contaminants in product flow.</p>
        <b>Features</b>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>Fast processing of pills and capsules</li>
          <li>Fast cleaning and sanitizing</li>
          <li>Works with all tablet presses and capsule filler</li>
          <li>Contaminants are detected and automatically rejected from the product stream without process interruption.</li>
          <li>Minimal loss of good material due to a fast reacting, powerful magnetic for the eject gate.</li>
          <li>Equipped with the quick-disconnect option.</li>
          <li>It can be thoroughly cleaned without dismantling or using tools.</li>
          <li>Reject system can be disassembled in seconds.</li>
          <li>Adjustable working height and angle allow use with all tablet presses and capsule fillers.</li>
        </ul>
        <div class=\"processing-card-actions\">
          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>
          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>
        </div>
      </div>
     </div>
     <div class=\"processing-card drawer-card\">
      <div class=\"processing-card-image\">
        <img src='assets/expertise/manufacturing/capsules/image copy 7.png' alt='Empty Sorter'>
      </div>
      <div class=\"processing-card-details\">
        <h3>Available in R&D Models, Manual, SA, Auto<br><span style='font-weight:400;font-size:1rem;'>Empty Sorter</span></h3>
        <p>Removes all empty capsules, and additionally checks for loose caps or loose powder</p>
        <ul style='margin-bottom: 1rem; color: #4a5568; font-size: 1rem; padding-left: 0; margin-left: 0; list-style-position: inside;'>
          <li>All contact parts made of SS-316 and all aluminum parts are specially plated.</li>
          <li>Sorts capsules of sizes 000 to 5</li>
          <li>Ensures 100% good capsules in your batch, sorting by weight.</li>
          <li>Rejects defective filled capsules irrespective of sizes, ensuring no lost time in changeovers</li>
        </ul>
        <div class=\"processing-card-actions\">
          <a href=\"#\" class=\"processing-btn primary\">Request GA drawing</a>
          <a href=\"#\" class=\"processing-btn secondary\">Enquire Now</a>
        </div>
      </div>
     </div>
    `;
    }
    else if (type === 'lifting-tripping') {
    content = `
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/material handling/image copy.png' alt='Lifting & Tripping Device'>
        </div>
        <div class="processing-card-details">
          <h3>Lifting & Tripping Device</h3>
          <p>Aksis specializes in designing and manufacturing IBC (bin) handling systems for every possible application. No matter what Bin type or style, such as round or square, we have the proven solution. We also specialize in High Containment / High Precision Lifters required for today's split butterfly valves systems used in pharma industries.<br><br>
Aksis has designed and produced thousands of bin lifts - more than all of our competitors combined. We offer free consultation and design layouts on all equipment<br><br>
Aksis lifter operates by engaging the container to a semicircular , single hook, fork type platform, lift arm attached to a column. The container is then raised and lowered by hydraulic system with built in safety parameters. The four point contact bearing on the column base with alow resistance factor makes it possible to position loaded container by hand radially, to discharge the contents in the process equipment's.<br><br>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
    `;
    }
    else if (type === 'lifting-positioning') {
      content = `
        <div class="processing-card drawer-card">
          <div class="processing-card-image">
            <img src='assets/expertise/material handling/image.png' alt='Intermediate Process Containers'>
          </div>
          <div class="processing-card-details">
            <h3>Lifting & Positioning Device</h3>
            <p>Intermediate Process Containers (IPCs) are made to specification in standard capacities ranging from 0.5-liter to 3000-liters in round, rectangular and square geometries. We also offer fully customized solutions for more demanding applications such as high containment systems. The corners of our square IBCs, whether 5-liters or 3000-liters are always made with a 2" radius to allow for the easy cleaning, insuring that cross contamination is not caused by the IBC.<br><br>
  Interior and exterior welds are ground smooth and flush to the sheeting surface. Our quality welding allows for a perfect appearance after grinding and polishing. We also offer a complete line of manways and ports. For pharmaceutical applications we generally use our lightweight stamped lid system which is not only easy to remove and clean, but also weighs very little. Clamping is made simple by a one-piece over-center clamping ring with safety-tamper lock. Manway rings come in several styles, including a super clean fully welded design fitted to the bin top.<br><br>
  Bin frames are made from totally enclosed tubing and offered with round vertical legs or square tubing and white recessed plastic feet so floors are not damaged during handling. Also separate trolleys are provided for Both Round Bin & Square Bin.</p>
            <div class="processing-card-actions">
              <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
              <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
            </div>
          </div>
        </div>
      `;
      }
    else if (type === 'intermediate-containers') {
    content = `
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/material handling/image copy 2.png' alt='Intermediate Process Containers'>
        </div>
        <div class="processing-card-details">
          <h3>Intermediate Process Containers</h3>
          <p>Intermediate Process Containers (IPCs) are made to specification in standard capacities ranging from 0.5-liter to 3000-liters in round, rectangular and square geometries. We also offer fully customized solutions for more demanding applications such as high containment systems. The corners of our square IBCs, whether 5-liters or 3000-liters are always made with a 2" radius to allow for the easy cleaning, insuring that cross contamination is not caused by the IBC.<br><br>
Interior and exterior welds are ground smooth and flush to the sheeting surface. Our quality welding allows for a perfect appearance after grinding and polishing. We also offer a complete line of manways and ports. For pharmaceutical applications we generally use our lightweight stamped lid system which is not only easy to remove and clean, but also weighs very little. Clamping is made simple by a one-piece over-center clamping ring with safety-tamper lock. Manway rings come in several styles, including a super clean fully welded design fitted to the bin top.<br><br>
Bin frames are made from totally enclosed tubing and offered with round vertical legs or square tubing and white recessed plastic feet so floors are not damaged during handling. Also separate trolleys are provided for Both Round Bin & Square Bin.</p>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
    `;
    }
    else if (type === 'square-bins') {
    content = `
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/material handling/image copy 3.png' alt='Square Bins'>
        </div>
        <div class="processing-card-details">
          <h3>Square Bins</h3>
          <p>Backed by the team of experienced professionals, we are able to manufacture, export and supply our clients a precision engineered range of Square Bins. The offered Bins are manufactured using premium grade Stainless Steel and Cutting-edge Technology and are extensively demanded among clients. Further, these Bins are available in various specifications to our clients at industry leading prices within the given span of time.<br><br>
          <b>Features</b>
          <ul style='margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
            <li>Optimum quality</li>
            <li>Corrosion resistant finish</li>
            <li>Sturdy construction</li>
          </ul>
          </p>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
    `;
    }
    else if (type === 'blister-pack') {
    content = `
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/packaging/image.png' alt='Blister Packing'>
        </div>
        <div class="processing-card-details">
          <h3>Blister Packing</h3>
          <p>We can supply quality electromechanical machine which forms blister pack, preformed packaging or containers, which it fills with product and seals. This machine can be used for packaging Capsules, Tablets, Vials, Syringes etc.<br><br>
          Normal stages in machine operation are as follows:</p>
          <ul style='margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
            <li>Switching on machine</li>
            <li>Heating of the materials</li>
            <li>Formation of pockets or cavities on the film</li>
            <li>Filling and checking of empty cavities</li>
            <li>Sealing of packages</li>
            <li>Trimming and printing of packages</li>
          </ul>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/packaging/image copy.png' alt='Cartoning'>
        </div>
        <div class="processing-card-details">
          <h3>Cartoning</h3>
          <p>We can supply good quality , high speed and accurate Semi Auto matic and Fully automatic Cartoning machine suitable for Blisters, Bottles, Vials, Tubes etc. This machine will have all necessary sections with high level electronics and operating systems. It comes along with attchments like leaflet insertions.
Sequence of operationa:</p>
          <ul style='margin: 0 0 1.2rem 1.2rem; color:#444; font-size:0.97rem;'>
            <li>Carton erection</li>
            <li>Product insertion</li>
            <li>Ear folding / Tuck in - Close in One side</li>
            <li>Carton closing</li>
            <li>Hot spraying</li>
            <li>Date stamping</li>
            <li>Ink-jet printing & leaflet insertion (optional)</li>
          </ul>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
    `;
    }
    else if (type === 'metal-detectors') {
    content = `
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/packaging/image copy 2.png' alt='Metal Detectors'>
        </div>
        <div class="processing-card-details">
          <h3>Metal Detectors</h3>
          <p>High accuracy, precise , reliable Metal detectors. We have been supplying range of metal detecHigh accuracy, precise , reliable Metal detectors. We have been supplying range of metal detectors to varierty of industry. These metal detectors are made to order and in conveyorised and non conveyorised forms. It is useful for Pharma and food industry also.tors to varierty of industry. These metal detectors are made to order and in conveyorised and non conveyorised forms. It is useful for Pharma and food industry also.</p>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
    `;
    }
    else if (type === 'effervescent-filling') {
    content = `
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/packaging/image copy 4.png' alt='Effervescent Tablet Filling Machine'>
        </div>
        <div class="processing-card-details">
          <h3>Effervescent Tablet Filling Machine / Tablet Packaging Machine</h3>
          <p>This method makes it possible to orientate and fill a large number of tablets into an elongate tube within a very short time, without exposing the tablets to any mechanical stress. Therefore the method is very well suitable for fragile products like effervescent tablets. With MMPE design this method has successfully been integrated into modern machines with superb accessibility for fast resetting and easy cleaning. The amount of movements in the machines are reduced to a minimum, therefore is less components and format parts needed. The MMPE tube filling machines are based on a well proven filling technology. The tablets are fed through rotating tubes in which they immediately are orientated by the centrifugal force.<br><br>
Our machines have a very wide format range. With only a few format parts needed can the machines be reset to handle tablets with a diameter from 22 mm up to 25 mm. Further on can the filling machines handle tubes with a length from 50 mm up to 200 mm without any format parts at all needed!</p>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
    `;
    }
    else if (type === 'change-parts') {
    content = `
      <div class="processing-card drawer-card">
        <div class="processing-card-image">
          <img src='assets/expertise/spare n services/image copy.png' alt='Change Parts'>
        </div>
        <div class="processing-card-details">
          <h3>Change Parts</h3>
          <p><b>Capsule Filling & Blister Packing</b><br>
          Size 00,0,1,2,3,4,5 capsule change parts for Manual / Semi Auto / Fully Auto machines in S.S & Food grade material can be supplied for any brand of capsule filling machines.<br><br>
          Similarly, change parts for Blister packing machines as per Blister drawings can be manufactured and supplied by us. Also cartoning machine needs few change parts as per carton sizes.<br><br>
          Critical spares for Capsule filling / Blister packing / Cartoning / Tablet press etc can be supplied as per drawings.</p>
          <div class="processing-card-actions">
            <a href="contact.html" class="processing-btn primary">Request GA drawing</a>
            <a href="contact.html" class="processing-btn secondary">Enquire Now</a>
          </div>
        </div>
      </div>
    `;
    }
    var drawer = document.getElementById('processing-drawer');
    var overlay = document.getElementById('processing-drawer-overlay');
    var contentDiv = document.getElementById('processing-drawer-content');
    if (contentDiv) contentDiv.innerHTML = content;
    if (drawer && overlay) {
        drawer.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(function () {
            drawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        }, 10);
    }
}

function closeProcessingDrawer() {
    document.getElementById('processing-drawer').classList.remove('open');
    setTimeout(function () {
        document.getElementById('processing-drawer').style.display = 'none';
        document.getElementById('processing-drawer-overlay').style.display = 'none';
        document.body.style.overflow = '';
    }, 350);
}

document.addEventListener('DOMContentLoaded', function () {
    var closeBtn = document.getElementById('processing-drawer-close');
    var overlay = document.getElementById('processing-drawer-overlay');
    if (closeBtn) closeBtn.onclick = closeProcessingDrawer;
    if (overlay) overlay.onclick = closeProcessingDrawer;
});
