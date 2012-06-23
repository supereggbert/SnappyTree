var getStringFileURL=function(text){
	try{
		var fileBlob=new Blob(text);		
	}catch(e){
		var blobBuilder=window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder;
		var bb=new blobBuilder();		
		bb.append(text);
		var fileBlob=bb.getBlob();
	}
	var URL=window.URL || window.webkitURL;
	var link=URL.createObjectURL(fileBlob);
	return link;
}

var generateColladaFile=function(trunkVerts,trunkNormals,trunkUV,trunkFaces, twigVerts,twigNormals,twigUV,twigFaces){
	var collada=[
	'<?xml version="1.0" encoding="utf-8"?>',
	'<COLLADA xmlns="http://www.collada.org/2005/11/COLLADASchema" version="1.4.1">',
	'  <asset>',
	'    <contributor>',
	'        <authoring_tool>TreeOMatic Alpha V0.1</authoring_tool>',
	'    </contributor>',
 	'    <unit name="meter"/>',
	'    <up_axis>Y_UP</up_axis>',
	'  </asset>',
	'  <library_effects>',
	'    <effect id="base-effect">',
	'      <profile_COMMON>',
	'        <technique sid="common">',
	'          <lambert>',
	'            <emission>',
	'              <color>0 0 0 1</color>',
	'            </emission>',
	'            <ambient>',
	'              <color>0 0 0 1</color>',
	'            </ambient>',
	'            <diffuse>',
	'              <color>0.8 0.8 0.8 1</color>',
	'            </diffuse>',
	'            <reflective>',
	'              <color>0 0 0 1</color>',
	'            </reflective>',
	'            <reflectivity>',
	'              <float>0</float>',
	'            </reflectivity>',
	'            <transparent>',
	'              <color>0 0 0 1</color>',
	'            </transparent>',
	'            <transparency>',
	'              <float>1</float>',
	'            </transparency>',
	'            <index_of_refraction>',
	'              <float>1</float>',
	'            </index_of_refraction>',
	'          </lambert>',
	'        </technique>',
	'      </profile_COMMON>',
	'    </effect>',
	'  </library_effects>',
	'  <library_materials>',
	'    <material id="Material">',
	'      <instance_effect url="#base-effect"/>',
	'    </material>',
	'  </library_materials>',
	'  <library_geometries>',
	'    <geometry id="Trunk-mesh">',
	'      <mesh>',
	'        <source id="Trunk-mesh-positions">',
	'          <float_array id="Trunk-mesh-positions-array" count="'+trunkVerts.length+'">'+trunkVerts.join(" ")+'</float_array>',
	'          <technique_common>',
	'            <accessor source="#Trunk-mesh-positions-array" count="'+(trunkVerts.length/3)+'" stride="3">',
	'              <param name="X" type="float"/>',
	'              <param name="Y" type="float"/>',
	'              <param name="Z" type="float"/>',
	'            </accessor>',
	'          </technique_common>',
	'        </source>',
	'        <source id="Trunk-mesh-normals">',
	'          <float_array id="Trunk-mesh-normals-array" count="'+trunkNormals.length+'">'+trunkNormals.join(" ")+'</float_array>',
	'          <technique_common>',
	'            <accessor source="#Trunk-mesh-normals-array" count="'+(trunkNormals.length/3)+'" stride="3">',
	'              <param name="X" type="float"/>',
	'              <param name="Y" type="float"/>',
	'              <param name="Z" type="float"/>',
	'            </accessor>',
	'          </technique_common>',
	'        </source>',
	'        <source id="Trunk-mesh-uv">',
	'          <float_array id="Trunk-mesh-uv-array" count="'+trunkUV.length+'">'+trunkUV.join(" ")+'</float_array>',
	'          <technique_common>',
	'            <accessor source="#Trunk-mesh-uv-array" count="'+(trunkUV.length/2)+'" stride="2">',
	'              <param name="S" type="float"/>',
	'              <param name="T" type="float"/>',
	'            </accessor>',
	'          </technique_common>',
	'        </source>',
	'        <vertices id="Trunk-mesh-vertices">',
	'          <input semantic="POSITION" source="#Trunk-mesh-positions"/>',
	'        </vertices>',
	'        <polylist material="Material" count="'+(trunkFaces.length/3)+'">',
	'          <input semantic="VERTEX" source="#Trunk-mesh-vertices" offset="0"/>',
	'          <input semantic="NORMAL" source="#Trunk-mesh-normals" offset="0"/>',
	'	 <input semantic="TEXCOORD" source="#Trunk-mesh-uv" offset="0" set="0"/>',
	'          <vcount>'+function(){var ret=[]; for(var i=0;i<trunkFaces.length/3;i++) ret.push(3); return ret}().join(" ")+'</vcount>',
	'          <p>'+trunkFaces.join(" ")+'</p>',
	'        </polylist>',
	'      </mesh>',
	'    </geometry>',
	'    <geometry id="Twig-mesh">',
	'      <mesh>',
	'        <source id="Twig-mesh-positions">',
	'          <float_array id="Twig-mesh-positions-array" count="'+twigVerts.length+'">'+twigVerts.join(" ")+'</float_array>',
	'          <technique_common>',
	'            <accessor source="#Twig-mesh-positions-array" count="'+(twigVerts.length/3)+'" stride="3">',
	'              <param name="X" type="float"/>',
	'              <param name="Y" type="float"/>',
	'              <param name="Z" type="float"/>',
	'            </accessor>',
	'          </technique_common>',
	'        </source>',
	'        <source id="Twig-mesh-normals">',
	'          <float_array id="Twig-mesh-normals-array" count="'+twigNormals.length+'">'+twigNormals.join(" ")+'</float_array>',
	'          <technique_common>',
	'            <accessor source="#Twig-mesh-normals-array" count="'+(twigNormals.length/3)+'" stride="3">',
	'              <param name="X" type="float"/>',
	'              <param name="Y" type="float"/>',
	'              <param name="Z" type="float"/>',
	'            </accessor>',
	'          </technique_common>',
	'        </source>',
	'        <source id="Twig-mesh-uv">',
	'          <float_array id="Twig-mesh-uv-array" count="'+twigUV.length+'">'+twigUV.join(" ")+'</float_array>',
	'          <technique_common>',
	'            <accessor source="#Twig-mesh-uv-array" count="'+(twigUV.length/2)+'" stride="2">',
	'              <param name="S" type="float"/>',
	'              <param name="T" type="float"/>',
	'            </accessor>',
	'          </technique_common>',
	'        </source>',
	'        <vertices id="Twig-mesh-vertices">',
	'          <input semantic="POSITION" source="#Twig-mesh-positions"/>',
	'        </vertices>',
	'        <polylist material="Material" count="'+(twigFaces.length/3)+'">',
	'          <input semantic="VERTEX" source="#Twig-mesh-vertices" offset="0"/>',
	'          <input semantic="NORMAL" source="#Twig-mesh-normals" offset="0"/>',
	'	 <input semantic="TEXCOORD" source="#Twig-mesh-uv" offset="0" set="0"/>',
	'          <vcount>'+function(){var ret=[]; for(var i=0;i<twigFaces.length/3;i++) ret.push(3); return ret}().join(" ")+'</vcount>',
	'          <p>'+twigFaces.join(" ")+'</p>',
	'        </polylist>',
	'      </mesh>',
	'    </geometry>',
	'  </library_geometries>',
	'  <library_visual_scenes>',
	'    <visual_scene id="Scene">',
	'      <node id="Tree" type="NODE">',
	'        <translate sid="location">0 0 0</translate>',
	'        <rotate sid="rotationZ">0 0 1 0</rotate>',
	'        <rotate sid="rotationY">0 1 0 0</rotate>',
	'        <rotate sid="rotationX">1 0 0 0</rotate>',
	'        <scale sid="scale">1 1 1</scale>',
	'        <instance_geometry url="#Trunk-mesh">',
 	'         <bind_material>',
	'            <technique_common>',
	'              <instance_material symbol="Material" target="#Material"/>',
	'            </technique_common>',
	'          </bind_material>',
	'        </instance_geometry>',
	'        <instance_geometry url="#Twig-mesh">',
	'          <bind_material>',
	'            <technique_common>',
	'              <instance_material symbol="Material" target="#Material"/>',
	'            </technique_common>',
	'          </bind_material>',
	'        </instance_geometry>',
	'      </node>',
	'    </visual_scene>',
	'  </library_visual_scenes>',
	'  <scene>',
	'      <instance_visual_scene url="#Scene"/>',
	'  </scene>',
	'</COLLADA>'].join("\n");
	return getStringFileURL(collada);
};

var generateObjFile=function(trunkVerts,trunkNormals,trunkUV,trunkFaces, twigVerts,twigNormals,twigUV,twigFaces){
	var output=[];
	output.push("mtllib tree.mtl");
	for(var i=0;i<trunkVerts.length;i+=3){
		output.push("v "+trunkVerts[i]+" "+trunkVerts[i+1]+" "+trunkVerts[i+2]);
	}
	for(var i=0;i<twigVerts.length;i+=3){
		output.push("v "+twigVerts[i]+" "+twigVerts[i+1]+" "+twigVerts[i+2]);
	}
	for(var i=0;i<trunkNormals.length;i+=3){
		output.push("vn "+trunkNormals[i]+" "+trunkNormals[i+1]+" "+trunkNormals[i+2]);
	}
	for(var i=0;i<twigNormals.length;i+=3){
		output.push("vn "+twigNormals[i]+" "+twigNormals[i+1]+" "+twigNormals[i+2]);
	}
	for(var i=0;i<trunkUV.length;i+=2){
		output.push("vt "+trunkUV[i]+" "+trunkUV[i+1]);
	}
	for(var i=0;i<twigUV.length;i+=2){
		output.push("vt "+twigUV[i]+" "+twigUV[i+1]);
	}
	output.push("g tree");
	output.push("usemtl tree");
	for(var i=0;i<trunkFaces.length;i+=3){
		output.push("f "+(trunkFaces[i]+1)+"/"+(trunkFaces[i]+1)+"/"+(trunkFaces[i]+1)+" "+(trunkFaces[i+1]+1)+"/"+(trunkFaces[i+1]+1)+"/"+(trunkFaces[i+1]+1)+" "+(trunkFaces[i+2]+1)+"/"+(trunkFaces[i+2]+1)+"/"+(trunkFaces[i+2]+1));
	}	
	output.push("g twig");
	output.push("usemtl twig");
	var offset=trunkVerts.length/3+1;
	for(var i=0;i<twigFaces.length;i+=3){
		output.push("f "+(twigFaces[i]+offset)+"/"+(twigFaces[i]+offset)+"/"+(twigFaces[i]+offset)+" "+(twigFaces[i+1]+offset)+"/"+(twigFaces[i+1]+offset)+"/"+(twigFaces[i+1]+offset)+" "+(twigFaces[i+2]+offset)+"/"+(twigFaces[i+2]+offset)+"/"+(twigFaces[i+2]+offset));
	}
	return getStringFileURL(output.join("\n"));
}
